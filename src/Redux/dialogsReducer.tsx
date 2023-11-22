import { DialogType, MessagesType } from "../Types/types"
import { InferActionsTypes } from "./redux-store"

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

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case  "SEND-MESSAGE":
            let body =  action.newMessageBody
            return {...state,
                messages: [...state.messages, {id: 4, message: body}],
            }
        default:  return state      
    }
}  

export const actions = {
    sendMessageCreator: (newMessageBody: string) => 
    ({type: "SEND-MESSAGE", newMessageBody} as const)
}

export default dialogsReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>