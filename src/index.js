import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import state from './State/State'; 

// let posts = [
//   { id: 1, message: "Hi, how are you?", likesCount: 15},
//   { id: 2, message: "It's my first post", likesCount: 10},
//   { id: 2, message: "Oups", likesCount: 1},
//   { id: 3, message: "Oupsss", likesCount: 12},

// ];

// let dialogs = [
// {id: 1, name: 'Alex'},
// {id: 2, name: 'Nastya'},
// {id: 3, name: 'Alina'},
// {id: 4, name: 'Artem'},

// ];

// let messages = [
// {id: 1, message: "Hi"},
// {id: 2, message: "Hi Hi"},
// {id: 3, message: 'Hello World'}

// ];



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <App state={state}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
