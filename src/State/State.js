import { rerenderEntireTree } from '../render';

let state = {

    profilePages: {
       posts:  [
        { id: 1, message: "Hi, how are you?", likesCount: 15},
        { id: 2, message: "It's my first post", likesCount: 10},
        { id: 2, message: "Oups", likesCount: 1},
        { id: 3, message: "Oupsss", likesCount: 12},
      ],
      newPostText: 'it-kamasut',
    },

    dialogsPages: {
        dialogs: [
            {id: 1, name: 'Alex', img: './1.jpg'},
            {id: 2, name: 'Nastya', img: './2.jpg'},
            {id: 3, name: 'Alina', img: './3.jpg'},
            {id: 4, name: 'Artem', img: './4.jpg'},
    
    ],
        messages: [
            {id: 1, message: "Hi"},
            {id: 2, message: "Hi Hi"},
            {id: 3, message: 'Hello World'}
            ],
    },
    sidebar: {},
};  

window.state = state

export let addPost =  () => {

    let newPost = {
        id: 5,
        message: state.profilePages.newPostText,
        likesCount: 0
    };

    state.profilePages.posts.push(newPost);
    state.profilePages.newPostText = "";
    rerenderEntireTree(state);
};

export let updateNewPostText =  (newText) => {

    state.profilePages.newPostText = newText;
    rerenderEntireTree(state);
};

export let addMessage =  (message) => {

    let newMessage = {
        id: 5,
        message: message,
    };
    
    state.dialogsPages.messages.push(newMessage);
    rerenderEntireTree(state);
};

export default state;