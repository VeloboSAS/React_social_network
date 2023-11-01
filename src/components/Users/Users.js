import React from "react";
import s from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from "./User";

const Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users,  ...props}) => {

    return <>
            <div className={s.wrapper}>
                <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                            totalUsersCount={totalUsersCount} pageSize={pageSize}  />
                <div>
                    { 
                    users.map( (u, index) => <User user={u} followingInProgress={props.followingInProgress}
                                                    unfollow={props.unfollow} follow={props.follow}
                                                    key={index} className={s.content}/>
                    )}
                </div>
            </div>
            </>
}

export default Users;