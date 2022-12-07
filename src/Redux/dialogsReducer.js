const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {


    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            return {...state,
                newMessageBody: action.newBody
            }
        case  SEND_MESSAGE:
            let body =  state.newMessageBody;
            return {...state,
                newMessageBody: '',
                messages: [...state.messages, {id: 4, message: body}]
            }
        default:  return state;      
    }
}

export const updateNewMessageBodyCreator = (body) => ({
    type: UPDATE_NEW_MESSAGE_BODY, newBody: body
})    

export const sendMessageCreator = () => ({type: SEND_MESSAGE})

export default dialogsReducer;