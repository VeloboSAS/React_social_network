import React from "react";
import s from './MyPosts.module.css';
import Post from './Posts/Post'


const MyPosts = (props) =>{
    let postData = [
        { id: 1, message: "Hi, how are you?", likesCount: 15},
        { id: 2, message: "It's my first post", likesCount: 10},
        { id: 2, message: "Oups", likesCount: 1}

    ];
    return (
            <div>
                <h3>My Posts</h3>
                <div>
                    <textarea rows="1" cols="17"></textarea>
                </div>    
                <div>   
                    <button className={s.button}>Add Post</button>
                </div>     
                <div className={s.posts}>
                    <Post  message={postData[0].message} likesCount={postData[0].likesCount} />
                    <Post  message={postData[1].message} likesCount={postData[1].likesCount}/>
                    <Post  message={postData[2].message} likesCount={postData[2].likesCount}/>
                </div>
            </div>
        ); 
}

export default  MyPosts;