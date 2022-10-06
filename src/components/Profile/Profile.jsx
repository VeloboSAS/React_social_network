import React from "react";
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";


const Navbar = (props) => {
    debugger;
    return (
        <div className={s.content}>
            <ProfileInfo />
            <MyPosts posts={props.profilePages.posts}
                    newPostText={props.profilePages.newPostText}
                    updateNewPostText={props.updateNewPostText}
                    addPost={props.addPost}/>
        </div>
        );
    
}

export default  Navbar;