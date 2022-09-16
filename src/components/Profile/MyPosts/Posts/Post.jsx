import React from "react";
import s from './Post.module.css';
import Ava from './Ava/Ava';


const Post = (props) => {

    return (
                <div className={s.posts}>    
                    <div className={s.item}>
                        <Ava />
                        {props.message}
                    </div>
                    <span>like</span>{props.likesCount}
                </div>
        ); 
}

export default  Post;