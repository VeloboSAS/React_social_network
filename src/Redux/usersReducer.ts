import { UsersType } from "../Types/types"
import { updateObjectInArray } from "../utils/objects-helpers"
import { BaseThunkType, InferActionsTypes } from "./redux-store"
import { Dispatch } from "redux"
import { usersAPI } from "../api/usersApi"
import { ApiResponseType, ResultCodesEnum } from "../api/api"

let initialState = {
    users:  [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [2, 3, 4] as Array<number>, //array of users id
    filter: {
        term: '',
        friend: null as null | boolean
    },
}
// Reducer
const usersReducer = (state = initialState, action: ActionsType): InitialState => {
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
        case 'SET_FILTER': {
            return {...state, filter: action.payload}
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
    setFilter:(filter: FilterType)=> ({type: 'SET_FILTER', payload: filter} as const),
    setTotalUsersCount:(totalUsersCount: number) =>
            ({type: 'SET_USERS_TOTAL_COUNT', count: totalUsersCount} as const),
    toogleIsFetching:(isFetching: boolean) => ({type: 'TOOGLE_IS_FETCHING', isFetching} as const),
    toogleFollowingProgress:(isFetching: boolean, userId: number) => 
        ({type: 'TOOGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)
}

 // Thunk  
export const requestUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch, getState) => {
    dispatch(actions.toogleIsFetching(true))
    dispatch(actions.setCurrentPage(page))
    dispatch(actions.setFilter(filter))
    const data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)
            dispatch(actions.toogleIsFetching(false))
            dispatch(actions.setUsers(data.items))
            dispatch(actions.setTotalUsersCount(data.totalCount))
            }
}

const _followUnfollowFlow = async (dispatch: DispatchType, userId: number,
                                  apiMethod: (userId: number) => Promise<ApiResponseType>,
                                   actionCreator: (userId: number)
                                    => ActionsType) => {
    dispatch(actions.toogleFollowingProgress(true, userId));
        const response = await apiMethod(userId)
                if (response.resultCode === ResultCodesEnum.Success) {
                    dispatch(actionCreator(userId))
                }
                dispatch(actions.toogleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
}};

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
       await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    }};

export default usersReducer;

export type InitialState = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsType = InferActionsTypes<typeof actions>
type DispatchType = Dispatch <ActionsType>
type ThunkType =  BaseThunkType<ActionsType>