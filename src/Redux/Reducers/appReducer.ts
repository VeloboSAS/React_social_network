import { getAuthUserData } from "./authReducer"
import { BaseThunkType, InferActionsTypes } from "../redux-store"
import { FormAction} from "redux-form"

let initialState = {
    initialized:  false,
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'INITIALIZED_SUCCESS':
            return {...state,
                initialized:  true}
    
        default:  return state     
    }}
   
const actions = {
    initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS'} as const),
}

export const initializeApp = (): ThunkType => async(dispatch) => {
    let promise = await dispatch(getAuthUserData())

    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess());
    })}
    
export default appReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType=  BaseThunkType<ActionsType | FormAction> 