import React from "react";
import s from './Users.module.css';
import user from '../../images/user.jpg';
import { NavLink } from "react-router-dom";

const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

        let pages = []

        for (let i=1; i <= pagesCount; i++) {
            pages.push(i);
        }

        let curP = props.currentPage;
        let curPF = ((curP - 5) < 0) ?  0  : curP - 5 ;
        let curPL = curP + 5;
        let slicedPages = pages.slice( curPF, curPL); 


    return <div className={s.users}>
                <div>
                    <h3 style={{color: "purple"}}>Users</h3>
                </div>
                <div className={s.pagination}>
                    { slicedPages.map( p => {
                        return <span className={props.currentPage === p && s.selectedPage}
                        onClick={ (e) => {props.onPageChanged(p)}}>{p}</span>
                    })}
                </div>
                { 
                props.users.map( (u, index) => <div key={index} className={s.content}>
                        <span>
                            <div>
                                <NavLink to={'./../profile/' + u.id}>
                                    <img src={u.photos.small != null ? u.photos.small : user} className={s.photoUrl} alt=""/>
                                </NavLink>
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