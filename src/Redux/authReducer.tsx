import { authAPI } from "../api/authAPI";
import { securityAPI } from "../api/securityAPI";
import { stopSubmit } from "redux-form"
import { AppStateType } from "./redux-store"
import { ThunkAction } from "redux-thunk"
import { ResultCodesEnum, ResultCodesForCaptchaEnum } from "../api/api";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState  = {
    userId:  null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null, //if null, then captcha is not required
};

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:    
            return {...state,
                    ...action.payload}            
    
        default:  return state;     
    }}

//Action Creator

type ActionsType = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType 

type SetAuthUserDataActionPayloadType = {
    userId: number | null, email: string | null, login: string | null, isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA, 
    payload: SetAuthUserDataActionPayloadType
}
 
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType  => 
     ({type: SET_USER_DATA, payload: {userId, email, login, isAuth}})

type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: {captchaUrl: string}
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType =>
     ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}})

 // Thunk   
type ThunkType =  ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getAuthUserData = (): ThunkType =>  async (dispatch, getState) => {

    const meData = await authAPI.me()
        if (meData.resultCode === ResultCodesEnum.Success) {
            let {id, email, login} = meData.data
            dispatch(setAuthUserData(id, email, login, true));
        }
    };

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch: any) => {
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
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl))
    };   


export const logout = (): ThunkType =>  async (dispatch) => {
    const response = await authAPI.logout()
        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    };  
export default authReducer;