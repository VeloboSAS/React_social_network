import { FC, useEffect } from "react"
import s from './Users.module.css'
import Paginator from '../common/Paginator/Paginator'
import User from "./User."
import { UsersSearchForm } from "./UsersSearchForm"
import { FilterType, requestUsers, follow, unfollow } from "../../Redux/usersReducer"
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from "../../Redux/usersSelectors"
import {  useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from "../../Redux/redux-store"
import { useLocation, useNavigate } from "react-router-dom"
import queryString from "query-string"

type QueryParamsType = {
    term?: string, page?: string, friend?: string
}
export const Users: FC = () => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch: AppDispatch = useDispatch()

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const parsed = queryString.parse(location.search) as QueryParamsType
        let actulalPage = currentPage
        let actualFilter = filter

        if(!!parsed.page) actulalPage = Number(parsed.page)

        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch (parsed.friend) {
            case "null":
                actualFilter = {...actualFilter, friend: null }
                break
            case "true":
                actualFilter = {...actualFilter, friend: true } 
                break
            case "false":
                actualFilter = {...actualFilter, friend: false } 
                break  
        }    

        dispatch(requestUsers(actulalPage, pageSize, actualFilter))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        
        const query: QueryParamsType = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        navigate({
            pathname: '/users',
            search: queryString.stringify(query),
        })
    }, [filter, currentPage, navigate])


    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followU = (userId: number) => {
        dispatch(follow(userId))
    }

    const unfollowU = (userId: number) => {
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
                                                    unfollow={unfollowU} follow={followU}
                                                    key={u.id}/>
                    )}
                </div>
            </div>
            </>
}