import { profileAPI } from "../api/profileAPI"
import { FormAction, stopSubmit } from "redux-form"
import { PhotosType, PostsType, ProfileType } from "../Types/types"
import { BaseThunkType, InferActionsTypes } from "./redux-store"
import { ResultCodesEnum } from "../api/api"

let initialState = {
    posts:  [
        { id: 1, message: "Hi, how are you?", likesCount: 15},
        { id: 2, message: "It's my first post", likesCount: 10},
        { id: 3, message: "Oups", likesCount: 1},
        { id: 4, message: "Oupsss", likesCount: 12},
      ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
}

// Reducer
const profileReducer = (state = initialState, action:ActionsType): InitialStateType => {
    switch(action.type) {
        case "ADD_POST": {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: "",
            };
        }
        case  "SET_STATUS":{
            return {...state,
                status: action.status,
            };
        }
        case  "SET_USER_PROFILE":{
            return {...state,
                profile: action.profile,
            };
        }
        case  "DELETE_POST":{
            return {...state,
                posts: state.posts.filter(p => p.id !== action.postId),
            };
        }

        case  "SAVE_PHOTO_SUCCESS":{
            return {...state,
                profile: {...state.profile, photos: action.photos} as ProfileType,
            };
        }
        default:  return state;     
    }};

// Actions

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: "ADD_POST", newPostText} as const),
    setUserProfile: (profile:  ProfileType) => ({type: 'SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),
    deletePost: (postId : number) => ({type:'DELETE_POST', postId} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const),
}

 // Thunk   

export const getUserProfile = (userId: number): ThunkType => async (dispatch, getState) => {
    try {
        const data = await profileAPI.getProfile(userId)
        dispatch(actions.setUserProfile(data));
        } catch(error) {
            console.warn("user is not defined")
        }};

export const getStatus = (userId: number): ThunkType => async (dispatch, getState) => {
    try {
        const data = await profileAPI.getStatus(userId)
        dispatch(actions.setStatus(data));
        } catch(error) {
            console.warn("status is not returned in request")
        }} ;


export const updateStatus = (status: string): ThunkType => async (dispatch, getState) => {
    try {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setStatus(status));
        }} catch(error) {
            console.warn("status is not updated")
        }};

export const savePhoto = (file: File): ThunkType => async (dispatch, getState) => {
    const data = await profileAPI.savePhoto(file)
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.savePhotoSuccess(data.data.photos));
        }}; 
        
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState ) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile)
        if (data.resultCode === ResultCodesEnum.Success) {
            if (userId != null) {
                dispatch(getUserProfile(userId))
            } else {
                throw new Error("userId cann't be null")
            }
         
        } else {
                let wrongNetwork = data.messages[0]
                    .slice(
                    data.messages[0].indexOf(">") + 1,
                    data.messages[0].indexOf(")")
                    )
                    .toLocaleLowerCase();
                dispatch(stopSubmit("edit-profile", {
                      contacts: { [wrongNetwork]: data.messages[0] }
                    })
                  );
                  return Promise.reject(data.messages[0]);
        }};         
    
export default profileReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType=  BaseThunkType<ActionsType | FormAction>