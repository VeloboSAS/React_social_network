import React from "react";
import MyPosts from './MyPosts';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../Redux/profileReducer';


const MyPostsContainer = (props) =>{

    let state = props.store.getState();

    let addPost = () => {
        props.store.dispatch(addPostActionCreator());

    }

    let onPostChange = (text) => {
        let action = updateNewPostTextActionCreator(text)
        props.store.dispatch(action);
    }


    return (
            <MyPosts updateNewPostText={onPostChange}
                    addPost={addPost}
                    posts={state.profilePages.posts}
                    newPostText={state.profilePages.newPostText}/>
        ); 
}

export default  MyPostsContainer;