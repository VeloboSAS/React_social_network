import React, {Component} from "react";
import { connect } from "react-redux";
import {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toogleIsFetching} from '../../Redux/usersReducer';
import axios from 'axios';
import Users from "./Users";
import Preloader from "../Preloader/Preloader";

class UsersContainer extends Component {

    componentDidMount() {
        this.props.toogleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then( response => {
                this.props.toogleIsFetching(false)
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
                })
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toogleIsFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then( response => {
            this.props.toogleIsFetching(false)
            this.props.setUsers(response.data.items)
                })
    }
    render() {
        return <>
                <Preloader isFetching={this.props.isFetching}/>
                 <Users totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currentPage}
                        onPageChanged={this.onPageChanged}
                        users={this.props.users}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}/> 
                </>
    }
}


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) =>{
//             dispatch(followAC(userId))
//         },
//         unfollow: (userId) =>{
//             dispatch(unfollowAC(userId))
//         },
//         setUsers: (users) =>{
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber) =>{
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) =>{
//             dispatch(setUsersTotalCountAC(totalCount))
//         },
//         toogleIsFetching: (isFetching) =>{
//             dispatch(toogleIsFetchingAC(is
//         },
//     }
// }

export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toogleIsFetching,
})(UsersContainer);