import React from "react";
import s from './Post.module.css';
import ava from './ava.jpeg';


const Post = (props) => {

    return (
                <div className={s.posts}>    
                    <div className={s.item}>
                        <img scr={ava} alt=""/>
                        {props.message}
                    </div>
                    <span>like</span>{props.likesCount}
                </div>
        ); 
}

export default  Post;