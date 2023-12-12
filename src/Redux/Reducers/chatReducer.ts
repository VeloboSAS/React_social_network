import { FormAction } from "redux-form"
import { BaseThunkType, InferActionsTypes } from "../redux-store"
import { ChatMessageType } from "../../pages/Chat/ChatPage"

import { Dispatch } from "redux"
import { chatAPI } from "../../api/chatAPI"

let initialState  = {
    messages:  [] as ChatMessageType[]
}
// Reducer
const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'samurai-network/chat/MESSAGES_RECEIVED':
            return {...state,
                    messages: [...state.messages, ...action.payload.messages]}            
    
        default:  return state;     
    }}

//Action Creator
export const actions = {
    messagesReceived: (messages: ChatMessageType[])  => 
     ({type: 'samurai-network/chat/MESSAGES_RECEIVED', payload: {messages}} as const),

}

 // Thunk   
let _newMessageHandler: ((message: ChatMessageType[]) => void) | null = null

 const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
 }

export const startMessagesListening = (): ThunkType =>  async (dispatch, getState) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
 }

 export const stopMessagesListening = (): ThunkType =>  async (dispatch, getState) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()

 }

 export const sendMessage = (message: string): ThunkType =>  async (dispatch, getState) => {
    chatAPI.sendMessage(message)
 }
 
export default chatReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType=  BaseThunkType<ActionsType | FormAction>