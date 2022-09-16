import React from "react";
import myimg from '../../../images/fon.jpg';
import s from './Images.module.css';


const Images = () => {
    return (
        <div className={s.img}>
            <img src={myimg} alt=""/>
        </div>
        );
    
}

export default  Images;