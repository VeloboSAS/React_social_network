import { FormAction } from "redux-form"
import { BaseThunkType, InferActionsTypes } from "../redux-store"
import { v4 } from 'uuid'
import { Dispatch } from "redux"
import { chatAPI, ChatMessageApiType, StatusType } from "../../api/chatAPI"

type ChatMessageType = ChatMessageApiType & {id: string}

let initialState  = {
    messages:  [] as ChatMessageType[],
    status: 'pending' as StatusType
}


// Reducer
const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'samurai-network/chat/MESSAGES_RECEIVED':
            return {...state,
                    messages: [...state.messages, ...action.payload.messages.map( m => ({...m, id: v4()}))]
                    .filter((m, index, array) => index >= array.length - 100)} 
        case 'samurai-network/chat/STATUS_CHANGED':
            return {...state,
                status: action.payload.status
            }
                                            
    
        default:  return state;     
    }}

//Action Creator
export const actions = {
    messagesReceived: (messages: ChatMessageApiType[])  => 
     ({type: 'samurai-network/chat/MESSAGES_RECEIVED', payload: {messages}} as const),
     statusChanged: (status: StatusType)  => 
     ({type: 'samurai-network/chat/STATUS_CHANGED', payload: {status}} as const),

}

 // Thunk   
let _newMessageHandler: ((message: ChatMessageApiType[]) => void) | null = null

 const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
 }

 let _statusChangedHandler: ((status: StatusType) => void) | null = null

 const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
 }

export const startMessagesListening = (): ThunkType =>  async (dispatch, getState) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
 }

 export const stopMessagesListening = (): ThunkType =>  async (dispatch, getState) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()

 }

 export const sendMessage = (message: string): ThunkType =>  async (dispatch, getState) => {
    chatAPI.sendMessage(message)
 }
 
export default chatReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType=  BaseThunkType<ActionsType | FormAction>