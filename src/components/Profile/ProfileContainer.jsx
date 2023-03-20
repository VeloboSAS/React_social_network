import React, {Component} from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {getUserProfile} from '../../Redux/profileReducer';
import {useParams, useLocation, useNavigate} from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect"; 


class ProfileContainer extends Component{

    componentDidMount() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = 2;
        }
        this.props.getUserProfile(userId)
    }
    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let AuthRedirectComponent = withAuthRedirect(ProfileContainer)

let mapStateToProps = (state) => ({
    profile: state.profilePages.profile,
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

export default connect(mapStateToProps, {getUserProfile})(withRouter(withRouter(AuthRedirectComponent)));