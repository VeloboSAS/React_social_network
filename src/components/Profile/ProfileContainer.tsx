import React, {Component, ComponentType} from "react"
import Profile from "./Profile"
import { connect } from "react-redux"
import {getUserProfile, getStatus, updateStatus,savePhoto, saveProfile} from '../../Redux/profileReducer'
import {useParams, useLocation, useNavigate} from "react-router-dom"
import { withAuthRedirect } from "../../hoc/withAuthRedirect" 
import { compose } from 'redux'
import { ProfileType } from "../../Types/types"
import { AppStateType } from "../../Redux/redux-store"

export type MapPropsType = ReturnType<typeof mapStateToProps>

export type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

type ParamsType = {
    userId: number | null
    router: any
    history: any
}


type PropsType = MapPropsType & DispatchPropsType & ParamsType

class ProfileContainer extends Component<PropsType>{

    refreshProfile() {
        let userId: number | null = this.props.router.params.userId;
        if (!userId) {
            userId = this.props.autorizedUserId;
                if (!userId) {
                    this.props.history.push("/login")
                }
        }

        if (!userId) {
            console.error("Id should exists")
        } else {
            this.props.getUserProfile(userId);
        this.props.getStatus(userId);
        }
    } 

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps: PropsType) {
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

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    autorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
})

export default compose<ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect,
)(ProfileContainer)


 export function withRouter<WCP extends JSX.IntrinsicAttributes> (Component: React.ComponentType<WCP>) {
    function ComponentWithRouterProp(props: WCP) {
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
