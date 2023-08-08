import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { TodoProvider } from './stores/Todos.tsx';
import {BrowserRouter} from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TodoProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TodoProvider>
  </React.StrictMode>,
)
