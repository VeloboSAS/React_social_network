import React, {Component} from "react"
import Profile from "./Profile"
import { connect } from "react-redux"
import {getUserProfile, getStatus, updateStatus,savePhoto, saveProfile} from '../../Redux/profileReducer'
import {useParams, useLocation, useNavigate} from "react-router-dom"
import { withAuthRedirect } from "../../hoc/withAuthRedirect" 
import { compose } from 'redux'
// import { AppStateType } from "../../Redux/redux-store"
// import { ProfileType } from "../../Types/types"

// type MapStatePropsType = {
//     // currentPage: number
//     // pageSize: number
//     // isFetching: boolean
//     // totalUsersCount: number
//     // users: Array<UsersType>
//     // followingInProgress: Array<number>
//     profile: Array<ProfileType>
//     status: string
//     autorizedUserId: any
//     isAuth: boolean

// }

// type MapDispatchPropsType = {
//     // requestUsers: (currentPage: number, pageSize: number) => void
//     // follow: (userId: number) => void
//     // unfollow: (userId: number) => void
//     getUserProfile: () => void

// }

// type OwnPropsType = {
//     pageTitle: string
// }

// type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType 

class ProfileContainer extends Component{

    refreshProfile() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = this.props.autorizedUserId;
                if (!userId) {
                    this.props.history.push("/login")
                }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    } 

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.router.params.userId !== prevProps.router.params.userId)
        this.refreshProfile()
    }

    render() {
        return (
            <Profile {...this.props} isOwner = {!this.props.router.params.userId}
                    profile={this.props.profile} status={this.props.status}
                    updateStatus={this.props.updateStatus}
                    savePhoto={this.props.savePhoto}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePages.profile,
    status: state.profilePages.status,
    autorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect,
)(ProfileContainer)

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}
