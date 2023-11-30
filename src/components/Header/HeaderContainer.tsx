import React, {Component} from "react"
import Header, { DispatchPropsType, MapPropsType} from "./Header"
import {connect} from 'react-redux'
import {logout } from "../../Redux/Reducers/authReducer"
import { AppStateType } from "../../Redux/redux-store"

class HeaderContainer extends Component<MapPropsType & DispatchPropsType> {
    render()  { 
           return <Header {...this.props} />
     }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {logout})(HeaderContainer)