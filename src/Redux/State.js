import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import sidebarReducer from './sidebarReducer';


let store = {
    _state: {

        profilePages: {
           posts:  [
            { id: 1, message: "Hi, how are you?", likesCount: 15},
            { id: 2, message: "It's my first post", likesCount: 10},
            { id: 3, message: "Oups", likesCount: 1},
            { id: 4, message: "Oupsss", likesCount: 12},
          ],
          newPostText: 'it-kamasutra',
        },
    
        dialogsPages: {
            dialogs: [
                {id: 1, name: 'Alex', img: require('../images/1.jpg')},
                {id: 2, name: 'Nastya', img: require('../images/2.jpg')},
                {id: 3, name: 'Alina', img: require('../images/3.jpg')},
                {id: 4, name: 'Artem', img: require('../images/4.jpg')},
            ],
            messages: [
                {id: 1, message: "Hi"},
                {id: 2, message: "Hi Hi"},
                {id: 3, message: 'Hello World'}
                ],
            newMessageBody: "" ,   
        },
        sidebar: {},
    },
    _callSuscriber() {
        console.log('State was changed')
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSuscriber = observer;
    },

    dispatch (action) {

        this._state.profilePages = profileReducer(this._state.profilePages, action);
        this._state.dialogsPages = dialogsReducer(this._state.dialogsPages, action); 
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);    

        this._callSuscriber(this._state);
    
    }
}

// export const addPostActionCreator = () => ({type: ADD_POST})

// export const updateNewPostTextActionCreator = (text) => ({
//         type: UPDATE_NEW_POST_TEXT, newText: text
//     })

// export const updateNewMessageBodyCreator = (body) => ({
//         type: UPDATE_NEW_MESSAGE_BODY, newBody: body
//     })    

// export const sendMessageCreator = () => ({type: SEND_MESSAGE})


export default store;

window.store = store;