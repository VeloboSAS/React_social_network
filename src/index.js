import reportWebVitals from './reportWebVitals';
import store from './State/State';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
let rerenderEntireTree = (state) => {
    root.render(

    <React.StrictMode>
      <App state={state}  addPost={store.addPost.bind(store)}
                          updateNewPostText={store.updateNewPostText.bind(store)}
                          addMessage={store.addMessage.bind(store)}/>
    </React.StrictMode>
);
}

 
rerenderEntireTree(store.getState());

store.subscribe(rerenderEntireTree);

reportWebVitals(); 
