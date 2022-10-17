import React from "react";
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";


const Navbar = (props) => {
    return (
        <div className={s.content}>
            <ProfileInfo />
            <MyPosts posts={props.profilePages.posts}
                    newPostText={props.profilePages.newPostText}
                    dispatch={props.dispatch}/>
        </div>
        );
    
}

export default  Navbar;