import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Login } from './pages/Login/Login';
import { ToDo } from './pages/ToDo/ToDo';


export const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Route path="/login" exact component={Login} />
            <Route path="/" exact component={ToDo} />
        </BrowserRouter>
    );
};