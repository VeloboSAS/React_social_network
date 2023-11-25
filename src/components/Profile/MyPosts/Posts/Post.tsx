import React, { FC } from "react"
import s from './Post.module.css'
import Ava from './Ava/Ava'

type PropsType = {
    message: string
    likesCount: number
}
const Post: FC<PropsType> = (props) => {

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

export default  Post