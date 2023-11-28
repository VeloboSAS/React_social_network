import React, { FC } from "react";
import s from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from "./User.";
import { UsersType } from "../../Types/types";
import { UsersSearchForm } from "./UsersSearchForm";
import { FilterType } from "../../Redux/usersReducer";

type PropsType = {
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    onFilterChanged: (filter: FilterType) => void,
    totalUsersCount: number,
    pageSize: number,
    users: Array<UsersType>,
    followingInProgress: Array<number>,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
}

const Users: FC<PropsType> = ({currentPage, onPageChanged, onFilterChanged, totalUsersCount, pageSize, users,  ...props}) => {

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
                    users.map(u => <User user={u} followingInProgress={props.followingInProgress}
                                                    unfollow={props.unfollow} follow={props.follow}
                                                    key={u.id}/>
                    )}
                </div>
            </div>
            </>
}

export default Users

