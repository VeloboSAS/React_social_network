import { FC, useEffect } from "react"
import s from './Users.module.css'
import Paginator from '../common/Paginator/Paginator'
import User from "./User."
import { UsersSearchForm } from "./UsersSearchForm"
import { FilterType, requestUsers, follow, unfollow } from "../../Redux/usersReducer"
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from "../../Redux/usersSelectors"
import {  useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from "../../Redux/redux-store"

type PropsType = {
    // currentPage: number,
    // onPageChanged: (pageNumber: number) => void,
    // onFilterChanged: (filter: FilterType) => void,
    // totalUsersCount: number,
    // pageSize: number,
    // users: Array<UsersType>,
    // followingInProgress: Array<number>,
    // unfollow: (userId: number) => void,
    // follow: (userId: number) => void,
}

export const Users: FC<PropsType> = (props) => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const follow = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return <>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
            <div className={s.wrapper}>
                <div className={s.users}>
                    <h3 >Users</h3>
                </div>
                <div className={s.paginator}>
                    <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                                totalItemsCount={totalUsersCount} pageSize={pageSize}  />
                </div>
                <div>
                    { 
                    users.map(u => <User user={u} followingInProgress={followingInProgress}
                                                    unfollow={unfollow} follow={follow}
                                                    key={u.id}/>
                    )}
                </div>
            </div>
            </>
}


