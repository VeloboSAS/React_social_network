import React from "react";
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";



const Navbar = () => {

    const style = ({ isActive }) => ({
        fontWeight: isActive ? 'bold' : 'normal',
        color: isActive ? 'blue' : 'blueviolet',
      });


    return (
        <nav className={s.nav}>
            <div>
                <NavLink to='/profile' style={style}>Profile</NavLink>
            </div>
            <div> 
                <NavLink to='/dialogs' style={style}>Messages</NavLink>
            </div>
            <div> 
                <NavLink to='/news' style={style}>News</NavLink>
            </div>
            <div> 
                <NavLink to='/music' style={style}>Music</NavLink>
            </div>
            <div> 
                <NavLink to='/settings' style={style}>Settings</NavLink>
            </div>
        </nav>
        );
    
}

export default  Navbar;