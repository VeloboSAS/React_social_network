import React from "react";
import s from './Ava.module.css';

const Ava = (props) => {

    return (
            <div className={s.item}> 
                <div className={s.img} >
                    <img src={props.img} alt={props.name} />
                </div>
            </div>
        ); 
}

export default  Ava;