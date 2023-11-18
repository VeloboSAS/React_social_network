import React, { FC } from "react";
import s from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from "./User.";
import { UsersType } from "../../Types/types";

type PropsType = {
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    totalUsersCount: number,
    pageSize: number,
    users: Array<UsersType>,
    followingInProgress: Array<number>,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
}

const Users: FC<PropsType> = ({currentPage, onPageChanged, totalUsersCount, pageSize, users,  ...props}) => {

    return <>
            <div className={s.wrapper}>
                <div className={s.users}>
                    <h3 >Users</h3>
                </div>
                <div>
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

export default Users;