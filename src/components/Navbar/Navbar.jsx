import React from "react";
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";



const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div>
                <NavLink to='/profile' style={({ isActive }) => ({color: isActive ? 'blue' : 'blueviolet'})}>Profile</NavLink>
            </div>
            <div> 
                <NavLink to='/dialogs' style={({ isActive }) => ({color: isActive ? 'blue' : 'blueviolet'})}>Messages</NavLink>
            </div>
            <div> 
                <NavLink to='/news' style={({ isActive }) => ({color: isActive ? 'blue' : 'blueviolet'})}>News</NavLink>
            </div>
            <div> 
                <NavLink to='/music' style={({ isActive }) => ({color: isActive ? 'blue' : 'blueviolet'})}>Music</NavLink>
            </div>
            <div> 
                <NavLink to='/settings' style={({ isActive }) => ({color: isActive ? 'blue' : 'blueviolet'})}>Settings</NavLink>
            </div>
        </nav>
        );
    
}

export default  Navbar;