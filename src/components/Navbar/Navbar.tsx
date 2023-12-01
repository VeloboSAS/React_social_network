import React, { FC } from "react"
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom"

const Navbar: FC = () => {
    //@ts-ignore
    const style = ({ isActive}) => ({
        fontWeight: isActive ? 'bold' : 'normal',
        color: isActive ? 'blue' : 'blueviolet',
      })

    return (
        <nav className={s.nav}>
            <div>
                <NavLink to='/profile' style={style}>Profile</NavLink>
            </div>
            <div> 
                <NavLink to='/dialogs' style={style}>Messages</NavLink>
            </div>
            <div> 
                <NavLink to='/developers' style={style}>Users</NavLink>
            </div>
            <div> 
                <NavLink to='/count' style={style}>Count</NavLink>
            </div>
            <div> 
                <NavLink to='/modal' style={style}>Modal</NavLink>
            </div>
            <div> 
                <NavLink to='/settings' style={style}>Settings</NavLink>
            </div>
            <div> 
                <NavLink to='/images' style={style}>Images</NavLink>
            </div>
        </nav>
        )
    
}

export default  Navbar