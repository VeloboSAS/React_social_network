import React, {Component} from "react";
import { connect } from "react-redux";
import {follow, unfollow, setCurrentPage,
      toogleFollowingProgress, requestUsers} from '../../Redux/usersReducer.tsx';
import Users from "./Users.tsx";
import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from "redux";
import { getPageSize, getTotalUsersCount,
     getCurrentPage, getIsFetching, getFollowingInProgress, getUsers  } from "../../Redux/usersSelectors";
import { UsersType } from "../../Types/types";
import { AppStateType } from "../../Redux/redux-store";

type PropsType = {
    currentPage: number
    pageSize: number
    requestUsers: (currentPage: number, pageSize: number) => void
    isFetching: boolean
    totalUsersCount: number
    users: Array<UsersType>
    follow: () => void
    unfollow: () => void
    followingInProgress: Array<number>
}     

class UsersContainer extends Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props;
        this.props.requestUsers(pageNumber, pageSize)

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
                        followingInProgress={this.props.followingInProgress}/> 
                </>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
}}
 
export default compose<PropsType>(
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, toogleFollowingProgress, requestUsers: requestUsers}),
    withAuthRedirect,
)(UsersContainer)

