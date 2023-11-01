import React from "react";
import s from './Users.module.css';
import userph from '../../images/user.jpg';
import { NavLink } from "react-router-dom";


const User = ({user, followingInProgress, unfollow, follow, index}) => {

    return  <div  key={index} className={s.content}>
                        <span>
                            <div>
                                <NavLink to={'./../profile/' + user.id}>
                                    <img src={user.photos.small != null ? user.photos.small : userph} className={s.photoUrl} alt=""/>
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
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        <span>
                            <div>{'u.location.country'}</div>
                            <div>{'u.location.city'}</div>
                        </span>
                    </div>
                }


export default User;