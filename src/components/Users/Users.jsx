import React, { Component } from "react";
import s from './Users.module.css';
import axios from 'axios';
import user from '../../images/user.jpg'

class Users extends Component {

    constructor(props) {
        super(props);
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then( response => {
                this.props.setUsers(response.data.items)
                })
    }
    render() {
        return <div className={s.users}>
                    <div>
                        <h3 style={{color: "purple"}}>Users</h3>
                    </div>
                    {
                    this.props.users.map( (u, index) => <div key={index} className={s.content}>
                            <span>
                                <div>
                                    <img src={u.photos.small != null ? u.photos.small : user} className={s.photoUrl} alt=""/>
                                </div>
                                <div>
                                    { u.followed ? <button onClick={ () => {this.props.unfollow(u.id)}}>Unfollow</button>
                                    : <button onClick={ () => {this.props.follow(u.id)}}>Follow</button>}
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
}

export default Users;