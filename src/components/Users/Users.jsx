import React, { Component } from "react";
import s from './Users.module.css';
import axios from 'axios';
import user from '../../images/user.jpg'

class Users extends Component {

    componentDidMount() {

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then( response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
                })
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then( response => {
                this.props.setUsers(response.data.items)
                })
    }
    render() {

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let pages = []

        for (let i=1; i <= pagesCount; i++) {
            pages.push(i);
        }

        let curP = this.props.currentPage;
        let curPF = ((curP - 5) < 0) ?  0  : curP - 5 ;
        let curPL = curP + 5;
        let slicedPages = pages.slice( curPF, curPL);

        return <div className={s.users}>
                    <div>
                        <h3 style={{color: "purple"}}>Users</h3>
                    </div>
                    <div className={s.pagination}>
                        { slicedPages.map( p => {
                            return <span className={this.props.currentPage === p && s.selectedPage}
                            onClick={ (e) => {this.onPageChanged(p)}}>{p}</span>
                        })}


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