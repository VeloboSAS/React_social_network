import React from "react";
import s from './Ava.module.css';
import ava from './ava.jpeg';


const Ava = (props) => {
    return (
                <div className={s.item}> 
                    <div className={s.img} >
                        <img src={ava} alt="" />
                    </div>
                </div>
        ); 
}

export default  Ava;