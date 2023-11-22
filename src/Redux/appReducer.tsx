import { getAuthUserData } from "./authReducer"
import { InferActionsTypes } from "./redux-store"

let initialState = {
    initialized:  false,
}

export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'INITIALIZED_SUCCESS':
            return {...state,
                initialized:  true}
    
        default:  return state     
    }}

type ActionsType = InferActionsTypes<typeof actions>    

const actions = {
    initializedSuccess: () => ({type: 'INITIALIZED_SUCCESS'} as const),
}

export const initializeApp = () => async(dispatch: any) => {
    let promise = await dispatch(getAuthUserData())

    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess());
    })}
    
export default appReducer;