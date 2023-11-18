import React, {Component} from "react"
import Header from "./Header"
import {connect} from 'react-redux'
import {logout } from "../../Redux/authReducer"
import { AppStateType } from "../../Redux/redux-store"

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
}

type MapDispatchPropsType = {
    logout: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType 

class HeaderContainer extends Component<PropsType> {
    render()  { 
           return <Header {...this.props} />
     }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    // userId: state.auth.userId,
})

export default connect(mapStateToProps, {logout})(HeaderContainer);