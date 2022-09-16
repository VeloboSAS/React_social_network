import React from "react";
import s from './MyPosts.module.css';
import Post from './Posts/Post'


const MyPosts = (props) =>{
    debugger;
    return (
            <div>
                My Posts
                <div>
                    <textarea rows="1" cols="17"></textarea>
                </div>    
                <div>   
                    <button className={s.button}>Add Post</button>
                    <button className={s.button}>Remove</button>
                </div>     
                <div className={s.posts}>
                    <Post message="Hi, how are you?" likesCount="15"/>
                    <Post message="It's my first post" likesCount="10"/>
                    <Post message="Oups" likesCount="1"/>
                </div>
            </div>
        ); 
}

export default  MyPosts;