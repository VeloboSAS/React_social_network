import React, {FC} from "react"
import logo from '../../images/logo192.png'
import s from './Header.module.css'
import buttonStyle from '../../App.module.css'
import {NavLink} from 'react-router-dom'

export type MapPropsType = {
    isAuth: boolean
    login: string | null
}

export type DispatchPropsType = {
    logout: () => void
}

const Header: FC<MapPropsType & DispatchPropsType> = (props) => {
    return (
        <header className={s.header}>
            <img src={logo} alt='logo'/>
            <div className={s.loginBlock}>
                { props.isAuth ? <div>{props.login} - <button className={buttonStyle.btn} 
                 onClick={props.logout}>Log Out</button></div>
                : <NavLink to={'/login'}>Login</NavLink> }
            </div>
        </header>
    )  
}

export default Header;