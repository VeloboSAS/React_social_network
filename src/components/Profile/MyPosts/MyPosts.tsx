import React, { FC, memo } from "react"
import s from './MyPosts.module.css'
import Post from './Posts/Post'
import {  AddNewPostFormRedux, AddPostFormValuesType } from "./AddPostForm/AddPostForm"
import { PostsType } from "../../../Types/types"

export type MapMyPostsPropsType = {
    posts: Array<PostsType>
 }
 
 export type DispatchMyPostsPropsType = {
    addPost: (newPostText: string) => void
 }

const MyPosts: FC<MapMyPostsPropsType & DispatchMyPostsPropsType> = props => {

        let postsElements = [...props.posts]
        .reverse()
        .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);
       
        let onAddPost = (values: AddPostFormValuesType) => {
            props.addPost(values.newPostText);
        }

        return (
            <div>
                <h3 className={s.title}>My Posts</h3>
                <AddNewPostFormRedux onSubmit={onAddPost}/>
                <div className={s.posts}>
                    { postsElements }
                </div>
            </div>
        ) }

export default memo(MyPosts);