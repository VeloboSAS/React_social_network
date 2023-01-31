import React, {Component} from "react";
import { connect } from "react-redux";
import {follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toogleIsFetching, toogleFollowingProgress} from '../../Redux/usersReducer';
import Users from "./Users";
import Preloader from "../Preloader/Preloader";
import {usersAPI} from '../../api/api';

class UsersContainer extends Component {

    componentDidMount() {
        this.props.toogleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then( data => {
                this.props.toogleIsFetching(false)
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
                })
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toogleIsFetching(true)
        usersAPI.getPage(pageNumber, this.props.pageSize).then( data => {
            this.props.toogleIsFetching(false)
            this.props.setUsers(data.items)
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
                        unfollow={this.props.unfollow}
                        toggleFollowingProgress={this.props.toogleFollowingProgress}
                        followingInProgress={this.props.followingInProgress}/> 
                </>
    }
}


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,


    }
}


export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toogleIsFetching,
    toogleFollowingProgress,
})(UsersContainer);