import React, {Component, ComponentType, ElementType} from "react"
import { connect } from "react-redux"
import {follow, unfollow, requestUsers} from '../../Redux/usersReducer'
import Users from "./Users"
import Preloader from "../common/Preloader/Preloader"
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from "redux"
import { getPageSize, getTotalUsersCount,
     getCurrentPage, getIsFetching, getFollowingInProgress, getUsers  } from "../../Redux/usersSelectors"
import { UsersType } from "../../Types/types"
import { AppStateType } from "../../Redux/redux-store"

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UsersType>
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void

}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType 

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
                <h2 style={{textAlign:'center'}}>{this.props.pageTitle}</h2>
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

let mapStateToProps = (state: AppStateType): MapStatePropsType  => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
}}
 
export default compose<ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
    (mapStateToProps, {follow, unfollow, requestUsers: requestUsers}),
    withAuthRedirect, 
)(UsersContainer)



