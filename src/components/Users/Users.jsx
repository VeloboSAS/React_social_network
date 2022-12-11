import React from "react";
import s from './Users.module.css';
import axios from 'axios';
import user from '../../images/user.jpg'



let Users = (props) => {
    if ( props.users.length === 0) {

        axios.get("https://social-network.samuraijs.com/api/1.0/users").then( response => {
            debugger;
            props.setUsers(response.data.items)
            })
    }

        return <div className={s.users}>
                    <div>
                        <h3 style={{color: "purple"}}>Users</h3>
                    </div>
                    {
                    props.users.map( (u, index) => <div key={index} className={s.content}>
                            <span>
                                <div>
                                    <img src={u.photos.small != null ? u.photos.small : user} className={s.photoUrl} alt=""/>
                                </div>
                                <div>
                                    { u.followed ? <button onClick={ () => {props.unfollow(u.id)}}>Unfollow</button>
                                    : <button onClick={ () => {props.follow(u.id)}}>Follow</button>}
                                </div>
                            </span>
                            <span>
                                <div>{u.name}</div>
                                <div>{u.status}</div>
                            </span>
                            <span>
                                <div>{'u.location.country'}</div>
                                <div>{'u.location.city'}</div>
                            </span>
                        </div>)
                    }
                </div>   
    
}

export default Users;