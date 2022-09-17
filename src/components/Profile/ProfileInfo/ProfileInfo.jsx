import React from "react";
import myimg from '../../../images/fon.jpg';
import s from './ProfileInfo.module.css';


const ProfileInfo = () => {
    return (
        <>
            <div className={s.img}>
                <img src={myimg} alt=""/>
            </div>
            <div className={s.descriptionBlock}>
                ava  + description
            </div>
        </>
        );
    
}

export default  ProfileInfo;