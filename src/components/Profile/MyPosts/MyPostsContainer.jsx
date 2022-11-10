import React from "react";
import MyPosts from './MyPosts';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../Redux/profileReducer';
import StoreContext from "../../../StoreContext";

const MyPostsContainer = () =>{

    return (
            <StoreContext.Consumer> 
                { (store) => {
                let state = store.getState();
                let addPost = () => {
                    store.dispatch(addPostActionCreator());
            
                }
            
                let onPostChange = (text) => {
                    let action = updateNewPostTextActionCreator(text)
                    store.dispatch(action);
                }    
                return <MyPosts updateNewPostText={onPostChange}
                        addPost={addPost}
                        posts={state.profilePages.posts}
                        newPostText={state.profilePages.newPostText}/>}
                }
           </StoreContext.Consumer> 
                  
        ); 
}

export default  MyPostsContainer;