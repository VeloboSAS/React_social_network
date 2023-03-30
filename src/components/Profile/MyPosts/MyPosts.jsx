import React from "react";
import s from './MyPosts.module.css';
import Post from './Posts/Post';
import { Field, reduxForm } from 'redux-form';

const MyPosts = (props) =>{

    let postsElements = props.posts.map(p => <Post  message={p.message} likesCount={p.likesCount} />);

    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    }


    return (
            <div>
                <h3 style={{color: 'purple'}}>My Posts</h3>
                <AddNewPostFormRedux onSubmit={onAddPost}/>
                <div className={s.posts}>
                    { postsElements }
                </div>
            </div>
        ); 
}

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"textarea"} name={"newPostText"}  placeholder={"Add Your Post"} />
            </div>
            <div>
                <button className={s.button} >Add Post</button>
            </div>     

        </form>
    )
}

const AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

export default  MyPosts;