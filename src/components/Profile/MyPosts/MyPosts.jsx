import React from "react";
import s from './MyPosts.module.css';
import Post from './Posts/Post'


const MyPosts = (props) =>{

    let postsElement = props.posts.map(p => <Post  message={p.message} likesCount={p.likesCount} />);

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
                    { postsElement }
                </div>
            </div>
        ); 
}

export default  MyPosts;