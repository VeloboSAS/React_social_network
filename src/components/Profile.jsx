import React from "react";
import myimg from '../images/fon.jpeg';
import s from './Profile.module.css';


const Navbar = () => {
    return (
        <div className={s.content}>
            <div>
            <img scr={myimg} alt=''/>
            </div>
            <div>
                ava  + description
            </div>
            <div>
                My Posts
                <div>
                    New posts
                </div>
                <div className={s.posts}>    
                    <div className={s.item}>post1</div>
                    <div className={s.item}>post1</div>
                    <div className={s.item}>post1</div>
                </div>
            </div>
        </div>
        );
    
}

export default  Navbar;