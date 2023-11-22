import { profileAPI } from "../api/profileAPI"
import { stopSubmit } from "redux-form"
import { PhotosType, PostsType, ProfileType } from "../Types/types"
import { AppStateType } from "./redux-store"
// import { Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"
const DELETE_POST = "DELETE_POST"
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS"

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
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case ADD_POST: {
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
        case  SET_STATUS:{
            return {...state,
                status: action.status,
            };
        }
        case  SET_USER_PROFILE:{
            return {...state,
                profile: action.profile,
            };
        }
        case  DELETE_POST:{
            return {...state,
                posts: state.posts.filter(p => p.id !== action.postId),
            };
        }

        case  SAVE_PHOTO_SUCCESS:{
            return {...state,
                profile: {...state.profile, photos: action.photos} as ProfileType,
            };
        }
        default:  return state;     
    }};

type ActionsType = AddPostActionCreatorActionType |  SetUserProfileActionType |  SetStatusActionType |
                    DeletePostActionType | SavePhotoSuccessActionType

type AddPostActionCreatorActionType = {
    type: typeof ADD_POST,
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({type: ADD_POST, newPostText})

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}

export const setUserProfile = (profile:  ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})

type SetStatusActionType = {
    type: typeof SET_STATUS,
    status: string,
}

export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status});

type DeletePostActionType = {
    type: typeof DELETE_POST,
    postId: number
}

export const deletePost = (postId : number): DeletePostActionType => ({type: DELETE_POST, postId});

type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType
}

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos});

 // Thunk   
// type GetStateType = () => AppStateType
//  type DispatchType = Dispatch <ActionsType>
 type ThunkType =  ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getUserProfile = (userId: number): ThunkType => async (dispatch, getState) => {
    try {
        const data = await profileAPI.getProfile(userId)
        dispatch(setUserProfile(data));
        } catch(error) {
            console.warn("user is not defined")
        }};

export const getStatus = (userId: number): ThunkType => async (dispatch, getState) => {
    try {
        const data = await profileAPI.getStatus(userId)
        dispatch(setStatus(data));
        } catch(error) {
            console.warn("status is not returned in request")
        }} ;


export const updateStatus = (status: string): ThunkType => async (dispatch, getState) => {
    try {
        const data = await profileAPI.updateStatus(status)
        if (data.resultCode === 0) {
            dispatch(setStatus(status));
        }} catch(error) {
            console.warn("status is not updated")
        }};

export const savePhoto = (file: any): ThunkType => async (dispatch, getState) => {
    const data = await profileAPI.savePhoto(file)
        if (data.resultCode === 0) {
            dispatch(savePhotoSuccess(data.data.photos));
        }}; 
        
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch: any, getState: any ) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile)
        if (data.resultCode === 0) {
            dispatch(getUserProfile(userId));
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
    
export default profileReducer;