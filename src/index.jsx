import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routes>
      
    </Routes>
    <Home />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals