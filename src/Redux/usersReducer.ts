import { UsersType } from "../Types/types"
import { updateObjectInArray } from "../utils/objects-helpers"
import { BaseThunkType, InferActionsTypes } from "./redux-store"
import { Dispatch } from "redux"
import { usersAPI } from "../api/usersApi"

let initialState = {
    users:  [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [2, 3, 4] as Array<number>, //array of users id
}
// Reducer
const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case "FOLLOW":
            return {...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                }
        case "UNFOLLOW":
            return {...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
        }
        case "SET_USERS": {
            return {
                ...state, users: action.users
            }
        }
        case "SET_CURRENT_PAGE": {
            return {
                ...state, currentPage: action.currentPage
            }
        }
        case "SET_USERS_TOTAL_COUNT": {
            return {
                ...state, totalUsersCount: action.count
            }
        }
        case "TOOGLE_IS_FETCHING": {
            return {
                ...state, isFetching: action.isFetching
            }
        }
        case "TOOGLE_IS_FOLLOWING_PROGRESS": {
            return {
                ...state,
                 followingInProgress: action.isFetching ?
                  [...state.followingInProgress, action.userId] :
                  state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        
        default:  return state;     
    }
}

// Actions                                              
export const actions = {
    followSuccess:(userId: number)  => ({type: 'FOLLOW', userId} as const),
    unfollowSuccess:(userId:number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers:(users: Array<UsersType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage:(currentPage: number)=> ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount:(totalUsersCount: number) =>
            ({type: 'SET_USERS_TOTAL_COUNT', count: totalUsersCount} as const),
    toogleIsFetching:(isFetching: boolean) => ({type: 'TOOGLE_IS_FETCHING', isFetching} as const),
    toogleFollowingProgress:(isFetching: boolean, userId: number) => 
        ({type: 'TOOGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)
}

 // Thunk  
export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
    dispatch(actions.toogleIsFetching(true))
    dispatch(actions.setCurrentPage(page));
    const data = await usersAPI.getUsers(page, pageSize);
            dispatch(actions.toogleIsFetching(false))
            dispatch(actions.setUsers(data.items));
            dispatch(actions.setTotalUsersCount(data.totalCount));
            }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number)
                                    => ActionsType) => {
    dispatch(actions.toogleFollowingProgress(true, userId));
        const data = await apiMethod(userId)
                if (data.resultCode === 0) {
                    dispatch(actionCreator(userId))
                }
                dispatch(actions.toogleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
}};

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
       _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    }};

export default usersReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type DispatchType = Dispatch <ActionsType>
type ThunkType =  BaseThunkType<ActionsType>