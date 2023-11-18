import React, {FC} from "react"
import logo from '../../images/logo192.png'
import s from './Header.module.css'
import {NavLink} from 'react-router-dom'

type PropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

const Header: FC<PropsType> = (props) => {
    return (
        <header className={s.header}>
            <img src={logo} alt='logo'/>
            <div className={s.loginBlock}>
                { props.isAuth ? <div>{props.login} - <button className={s.btn} onClick={props.logout}>Log Out</button></div>
                : <NavLink to={'/login'}>Login</NavLink> }
            </div>
        </header>
    );
    
}

export default Header;