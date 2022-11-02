const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = "SEND-MESSAGE";

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
                {id: 1, name: 'Alex', img: 'https://avatars.mds.yandex.net/i?id=31637953c75d4d4c928ae5a9cf21d05b6f9620b3-7084983-images-thumbs&n=13'},
                {id: 2, name: 'Nastya', img: 'https://avatars.mds.yandex.net/i?id=423ebd40b07d5b760b0443ab189cfb29502120ab-7012371-images-thumbs&n=13'},
                {id: 3, name: 'Alina', img: 'https://avatars.mds.yandex.net/i?id=dc1d33e0d266da8181e375fe785a133b9c58a0b9-5714527-images-thumbs&n=13'},
                {id: 4, name: 'Artem', img: 'https://avatars.mds.yandex.net/i?id=934cf45106d5234e2d3f9aec6ab7ab4e-5348870-images-thumbs&n=13'},
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
        if (action.type === ADD_POST) {
            let newPost = {
                id: 5,
                message: this._state.profilePages.newPostText,
                likesCount: 0
            };
            this._state.profilePages.posts.push(newPost);
            this._state.profilePages.newPostText = "";
            this._callSuscriber(this._state);
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePages.newPostText = action.newText;
            this._callSuscriber(this._state);
        } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
            this._state.dialogsPages.newMessageBody = action.newBody;
            this._callSuscriber(this._state);
        } else if (action.type === SEND_MESSAGE) {
            let body = {
                id: 4,
                message: this._state.dialogsPages.newMessageBody
            }
            this._state.dialogsPages.messages.push(body);
            this._state.dialogsPages.newMessageBody = '';
            this._callSuscriber(this._state);
        }
    }
}

export const addPostActionCreator = () => ({type: ADD_POST})

export const updateNewPostTextActionCreator = (text) => ({
        type: UPDATE_NEW_POST_TEXT, newText: text
    })

export const updateNewMessageBodyCreator = (body) => ({
        type: UPDATE_NEW_MESSAGE_BODY, newBody: body
    })    

export const sendMessageCreator = () => ({type: SEND_MESSAGE})


export default store;

window.store = store;