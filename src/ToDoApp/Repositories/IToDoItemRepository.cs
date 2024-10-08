using System.Collections.Generic;
using System.Threading.Tasks;
using ToDoApp.Models;

namespace ToDoApp.Repositories
{
    public interface ITodoItemRepository
    {
        Task<IEnumerable<TodoItem>> GetTodoItems(int userId);
        Task<TodoItem> GetTodoById(int id);
        Task Insert(TodoItem todoItem);
        Task Update(int id, TodoItem todoItem);
        Task Delete(int id);
        Task<bool> Exists(int id);
    }
}
