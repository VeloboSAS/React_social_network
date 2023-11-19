import { DialogType, MessagesType } from "../Types/types"

const SEND_MESSAGE = "SEND-MESSAGE"

let initialState = {
    dialogs: [
        {id: 1, name: 'Alex', img: require('../images/1.jpg')},
        {id: 2, name: 'Nastya', img: require('../images/2.jpg')},
        {id: 3, name: 'Alina', img: require('../images/3.jpg')},
        {id: 4, name: 'Artem', img: require('../images/4.jpg')},
    ] as Array<DialogType>,

    messages: [
        {id: 1, message: "Hi"},
        {id: 2, message: "Hi Hi"},
        {id: 3, message: 'Hello World'}
        ] as Array<MessagesType>,
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: SendMessageCreatorActionType): InitialStateType => {

    switch (action.type) {
        case  SEND_MESSAGE:
            let body =  action.newMessageBody
            return {...state,
                messages: [...state.messages, {id: 4, message: body}],
            }
        default:  return state      
    }
}  

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => 
    ({type: SEND_MESSAGE, newMessageBody})

export default dialogsReducer