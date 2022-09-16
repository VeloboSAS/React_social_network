import React from "react";
import s from './Navbar.module.css';



const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div>
                <a href='#s' className={`${s.item} ${s.active}`}>Profile</a>
            </div>
            <div>
            <a href='#s' className={`${s.item} ${s.active}`}>Messages</a>
            </div>
            <div>
            <a href='#s' className={`${s.item} ${s.active}`}>News</a>
            </div>
            <div>
            <a href='#s' className={`${s.item} ${s.active}`}>Music</a>
            </div>
            <div>
            <a href='#s' className={`${s.item} ${s.active}`}>Settings</a>
            </div>
        </nav>
        );
    
}

export default  Navbar;