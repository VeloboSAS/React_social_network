import React from "react";
import s from './MyPosts.module.css';
import Post from './Posts/Post';


const MyPosts = (props) =>{

    let postsElements = props.posts.map(p => <Post  message={p.message} likesCount={p.likesCount} />);

    let newPostElement = React.createRef();

    let onAddPost = () => {
        props.addPost();

    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }


    return (
            <div>
                <h3>My Posts</h3>
                <div>
                    <textarea onChange={onPostChange} rows="1" cols="17" ref={newPostElement} value={props.newPostText} />
                </div>    
                <div>   
                    <button className={s.button} onClick={ onAddPost }>Add Post</button>
                </div>     
                <div className={s.posts}>
                    { postsElements }
                </div>
            </div>
        ); 
}

export default  MyPosts;