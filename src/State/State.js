let store = {
    _state: {

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
    },
    getState() {
        debugger;
        return this._state;
    },
    _callSuscriber() {
        console.log('State was changed')
    },
    addPost() {
        debugger;
        let newPost = {
            id: 5,
            message: this._state.profilePages.newPostText,
            likesCount: 0
        };
    
        this._state.profilePages.posts.push(newPost);
        this._state.profilePages.newPostText = "";
        this._callSuscriber(this._state);
    },
    updateNewPostText(newText) {

        this._state.profilePages.newPostText = newText;
        this._callSuscriber(this._state);
    },
    addMessage(message) {

        let newMessage = {
            id: 5,
            message: message,
        };
        
        this._state.dialogsPages.messages.push(newMessage);
        this._callSuscriber(this._state);
    },
    subscribe(observer) {
        this._callSuscriber = observer;
    },
}

export default store;

window.store = store;