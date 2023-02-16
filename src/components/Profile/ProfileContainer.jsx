import React, {Component} from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {getUserProfile} from '../../Redux/profileReducer';
import {useParams, useLocation, useNavigate} from "react-router-dom"; 
import {Navigate} from "react-router-dom";

class ProfileContainer extends Component{

    componentDidMount() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = 2;
        }
        this.props.getUserProfile(userId)
    }
    render() {
        if (!this.props.isAuth) return <Navigate to={'/login'} />;
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePages.profile,
    isAuth: state.auth.isAuth,
})


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

export default connect(mapStateToProps, {getUserProfile})(withRouter(withRouter(ProfileContainer)));