import React from "react";
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import Images from "./Images/Images";


const Navbar = () => {
    return (
        <div className={s.content}>
            <Images />
            <div>
                ava  + description
            </div>
            <MyPosts hi="yo"/>
        </div>
        );
    
}

export default  Navbar;