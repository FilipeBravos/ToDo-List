import React, { useState, useEffect } from 'react';
// import logo from '../../assets/done_outline-black.svg';
// import add from '../../assets/add-black-36dp.svg';
import './styles.css';
import { TodoItem } from '../../models';
import { todoApiFactory } from '../../services/ToDoApi';
import { useHistory } from 'react-router-dom';
import { ToDoItem } from './ToDoItemComponent/ToDoItem';

export const ToDo: React.FC = () => {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [todoInput, setTodoInput] = useState('');
    const [token] = useState(() => {
        return window.sessionStorage.getItem('token') ?? '';
    });
    const history = useHistory();

    useEffect(() => {
        const { getTodos } = todoApiFactory(token);
        getTodos().then((result) => {
            if (result.status !== 'success') {
                history.push('/login');
                return;
            }
            setTodos(result.data!);
        });
    }, [history, token]);

    const handleCreateTodo = async () => {
        const { createTodo } = todoApiFactory(token);
        const todo: TodoItem = {
            id: 0,
            title: todoInput,
            completed: false,
        };
        setTodoInput('');

        const response = await createTodo(todo);

        if (
            response.status === 'unauthorized' ||
            response.status === 'forbid'
        ) {
            history.push('/login');
            return;
        }

        if (response.status !== 'success') return;

        const newTodo = response.data!;
        setTodos([...todos, newTodo]);
    };

    const handleDeleteTodo = async (todoItem: TodoItem) => {
        const { deleteTodo } = todoApiFactory(token);
        const response = await deleteTodo(todoItem.id);

        if (
            response.status === 'unauthorized' ||
            response.status === 'forbid'
        ) {
            history.push('/login');
            return;
        }

        if (response.status !== 'success') return;
        setTodos(todos.filter((todo) => todo.id !== todoItem.id));
    };

    const handleCompleteTodo = async (todoItem: TodoItem) => {
        const { updateTodo } = todoApiFactory(token);
        const response = await updateTodo(todoItem);
        if (
            response.status === 'unauthorized' ||
            response.status === 'forbid'
        ) {
            history.push('/login');
        }
    };

    return (
        <div className="todolist-page">
            <header className="todolist-title-container">
                <img  alt="logo" /> <strong>Todo List</strong>
            </header>
            <main className="todo-list-main">
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <ToDoItem
                                todoItem={todo}
                                onDelete={handleDeleteTodo}
                                onMarkAsCompleted={handleCompleteTodo}
                            />
                        </li>
                    ))}
                </ul>
            </main>
            <div className="new-todo-input">
                <input
                    type="text"
                    placeholder="nova tarefa..."
                    onChange={(e) => setTodoInput(e.target.value)}
                    value={todoInput}
                />
                <button onClick={() => handleCreateTodo()}>
                    <img  alt="Create" />
                </button>
            </div>
        </div>
    );
};