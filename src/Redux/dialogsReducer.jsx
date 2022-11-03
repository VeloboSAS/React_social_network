const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = "SEND-MESSAGE";

const dialogsReducer = (state, action) => {

    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.newBody;
            return state;
        case  SEND_MESSAGE:
            let body = {
                id: 4,
                message: state.newMessageBody,
            };
            state.messages.push(body);
            state.newMessageBody = '';
            return state; 
        default:  return state;      
    }
}

export const updateNewMessageBodyCreator = (body) => ({
    type: UPDATE_NEW_MESSAGE_BODY, newBody: body
})    

export const sendMessageCreator = () => ({type: SEND_MESSAGE})

export default dialogsReducer;