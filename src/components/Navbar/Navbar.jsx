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
                <NavLink to='/count' style={style}>Count</NavLink>
            </div>
            <div> 
                <NavLink to='/modal' style={style}>Modal</NavLink>
            </div>
            <div> 
                <NavLink to='/quiz' style={style}>Quiz</NavLink>
            </div>
            <div> 
                <NavLink to='/settings' style={style}>Settings</NavLink>
            </div>
        </nav>
        );
    
}

export default  Navbar;