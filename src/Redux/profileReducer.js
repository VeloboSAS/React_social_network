import { usersAPI, profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

let initialState = {
    posts:  [
        { id: 1, message: "Hi, how are you?", likesCount: 15},
        { id: 2, message: "It's my first post", likesCount: 10},
        { id: 3, message: "Oups", likesCount: 1},
        { id: 4, message: "Oupsss", likesCount: 12},
      ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
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
                profile: {...state.profile, photos: action.photos},
            };
        }
        default:  return state;     
    }
}

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})

export const setStatus = (status) => ({type: SET_STATUS, status});

export const deletePost = (postId) => ({type: DELETE_POST, postId});

export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos});


export const getUserProfile = (userId) => async (dispatch) => {
    const response = await usersAPI.getProfile(userId)
        dispatch(setUserProfile(response.data));
        };

export const getStatus = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data));
        };

export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }};

export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
        if (response.data.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
        }}; 
        
export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile)
        if (response.data.data.resultCode === 0) {
            dispatch(getUserProfile(userId));
        } else {
                // const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
                // const error1 = () => {
                //     const errorObj = {}
                //     const arrayStrings = response.data.messages[0].split("(")[1].replace(")","").toLowerCase().split("->");
                //     const key1 = arrayStrings[0];
                //     const key2 = arrayStrings[1];
                //     errorObj[key1] = {};
                //     errorObj[key1][key2] = message
                //     return  errorObj
                // }
                let wrongNetwork = response.data.messages[0]
                .slice(
                  response.data.messages[0].indexOf(">") + 1,
                  response.data.messages[0].indexOf(")")
                )
                .toLocaleLowerCase();
                dispatch(
                    stopSubmit("edit-profile", {
                      contacts: { [wrongNetwork]: response.data.messages[0] }
                    })
                  );
                  return Promise.reject(response.data.messages[0]);
                // dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}))
                // return Promise.reject(response.data.messages[0])

        }
    
    };         
 

    
export default profileReducer;