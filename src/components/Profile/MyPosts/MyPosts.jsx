import React from "react";
import s from './MyPosts.module.css';
import Post from './Posts/Post'


const MyPosts = (props) =>{

    let postsElement = props.posts.map(p => <Post  message={p.message} likesCount={p.likesCount} />);

    let newPostElement = React.createRef();

    let addPost = () => {
        props.dispatch({type: 'ADD-POST'});

    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.dispatch({type: 'UPDATE-NEW-POST-TEXT', newText: text});
    }


    return (
            <div>
                <h3>My Posts</h3>
                <div>
                    <textarea onChange={onPostChange} rows="1" cols="17" ref={newPostElement} value={props.newPostText} />
                </div>    
                <div>   
                    <button className={s.button} onClick={ addPost }>Add Post</button>
                </div>     
                <div className={s.posts}>
                    { postsElement }
                </div>
            </div>
        ); 
}

export default  MyPosts;