import React, {Component} from "react";
import { connect } from "react-redux";
import {follow, unfollow, setCurrentPage,
      toogleFollowingProgress, requestUsers} from '../../Redux/usersReducer';
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from "redux";
import { getPageSize, getTotalUsersCount,
     getCurrentPage, getIsFetching, getFollowingInProgress, getUsers  } from "../../Redux/usersSelectors";

class UsersContainer extends Component {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
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

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
}}
 
export default compose(
    connect(mapStateToProps, {follow, unfollow, setCurrentPage, toogleFollowingProgress, requestUsers}),
    withAuthRedirect,
)(UsersContainer)

