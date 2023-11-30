import React, { FC } from "react"
import s from './Users.module.css'
import userPhoto from '../../images/user.jpg'
import { NavLink } from "react-router-dom"
import { UsersType } from "../../Types/types"

type PropsType = {
    user: UsersType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const User: FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {

    return  <div className={s.content}>
                        <span>
                            <div>
                                <NavLink to={'./../profile/' + user.id}>
                                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={s.photoUrl} alt=""/>
                                </NavLink>
                            </div>
                            <div>
                                { user.followed ? <button disabled={followingInProgress.some(id => id ===user.id)} onClick={ () => {
                                    unfollow(user.id)}}>Unfollow</button>
                                : <button disabled={followingInProgress.some(id => id ===user.id)} onClick={ () => {
                                    follow(user.id) }}>Follow</button>}
                            </div>
                        </span>
                        <span>
                            <div>{user.id}</div>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{'u.location.country'}</div>
                            <div>{'u.location.city'}</div>
                        </span>
                    </div>
                }

                


export default User