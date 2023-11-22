import { authAPI } from "../api/authAPI"
import { securityAPI } from "../api/securityAPI"
import { FormAction, stopSubmit } from "redux-form"
import { BaseThunkType, InferActionsTypes } from "./redux-store"
import { ResultCodesEnum, ResultCodesForCaptchaEnum } from "../api/api"

let initialState  = {
    userId:  null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null, //if null, then captcha is not required
}
// Reducer
const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case 'samurai-network/auth/SET_USER_DATA':
        case 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS':    
            return {...state,
                    ...action.payload}            
    
        default:  return state;     
    }}

//Action Creator
export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean)  => 
     ({type: 'samurai-network/auth/SET_USER_DATA', payload: {userId, email, login, isAuth}} as const),
     getCaptchaUrlSuccess: (captchaUrl: string) =>
     ({type: 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}}as const)
}

 // Thunk   
export const getAuthUserData = (): ThunkType =>  async (dispatch, getState) => {

    const meData = await authAPI.me()
        if (meData.resultCode === ResultCodesEnum.Success) {
            let {id, email, login} = meData.data
            dispatch(actions.setAuthUserData(id, email, login, true));
        }
    };

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha)
        if (loginData.resultCode === ResultCodesEnum.Success) {
            //success, get auth data
            dispatch(getAuthUserData());
        } else {
            if (loginData.resultCode === ResultCodesForCaptchaEnum.CaptrchaIsRequired ){
                dispatch(getCaptchaUrl())
            }
            let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some Error"
            dispatch(stopSubmit("Login", {_error: message}))
        }
    };

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
    };   

export const logout = (): ThunkType =>  async (dispatch) => {
    const response = await authAPI.logout()
        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setAuthUserData(null, null, null, false));
        }
    };  
export default authReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType=  BaseThunkType<ActionsType | FormAction>