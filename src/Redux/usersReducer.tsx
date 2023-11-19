import { ThunkAction } from "redux-thunk"
import { usersAPI } from "../api/api"
import { UsersType } from "../Types/types"
import { updateObjectInArray } from "../utils/objects-helpers"
import { AppStateType } from "./redux-store"
import { Dispatch } from "redux"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_USERS_TOTAL_COUNT = 'SET_USERS_TOTAL_COUNT'
const TOOGLE_IS_FETCHING = 'TOOGLE_IS_FETCHING'
const TOOGLE_IS_FOLLOWING_PROGRESS = 'TOOGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
    users:  [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [2, 3, 4] as Array<number>, //array of users id
}

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case FOLLOW:
            return {...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                }
        case UNFOLLOW:
            return {...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
        }
        case SET_USERS: {
            return {
                ...state, users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state, currentPage: action.currentPage
            }
        }
        case SET_USERS_TOTAL_COUNT: {
            return {
                ...state, totalUsersCount: action.count
            }
        }
        case TOOGLE_IS_FETCHING: {
            return {
                ...state, isFetching: action.isFetching
            }
        }
        case TOOGLE_IS_FOLLOWING_PROGRESS: {
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

type ActionsType = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType |
                    SetCurrentPageActionType |  SetTotalUsersCountActionType | ToogleIsFetchingActionType | ToogleFollowingProgressActionType

type FollowSuccessActionType = {
    type: typeof FOLLOW,
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType  => ({type: FOLLOW, userId})

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW,
    userId: number
}
export const unfollowSuccess = (userId:number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId})

type SetUsersActionType = {
    type: typeof SET_USERS,
    users: Array <UsersType>
}
export const setUsers = (users: Array<UsersType>): SetUsersActionType => ({type: SET_USERS, users})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})

type SetTotalUsersCountActionType = {
    type: typeof SET_USERS_TOTAL_COUNT,
    count: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType =>
         ({type: SET_USERS_TOTAL_COUNT, count: totalUsersCount})

type ToogleIsFetchingActionType = {
    type: typeof TOOGLE_IS_FETCHING,
    isFetching: boolean
}
export const toogleIsFetching = (isFetching: boolean): ToogleIsFetchingActionType => ({type: TOOGLE_IS_FETCHING, isFetching})

type ToogleFollowingProgressActionType = {
    type: typeof TOOGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}
export const toogleFollowingProgress = (isFetching: boolean, userId: number): ToogleFollowingProgressActionType => 
    ({type: TOOGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})


 // Thunk   
// type GetStateType = () => AppStateType
type DispatchType = Dispatch <ActionsType>
type ThunkType =  ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const requestUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
    dispatch(toogleIsFetching(true))
    dispatch(setCurrentPage(page));
    const data = await usersAPI.getUsers(page, pageSize);
            dispatch(toogleIsFetching(false))
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
            }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => 
                                    FollowSuccessActionType | UnfollowSuccessActionType) => {
    dispatch(toogleFollowingProgress(true, userId));
        const data = await apiMethod(userId)
                if (data.resultCode === 0) {
                    dispatch(actionCreator(userId))
                }
                dispatch(toogleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
}};

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
       _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }};

export default usersReducer;