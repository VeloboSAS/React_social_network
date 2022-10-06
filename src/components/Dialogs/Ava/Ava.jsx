import React from "react";
import s from './Ava.module.css';
// import ava from './ava.jpeg';


const Ava = (props) => {
    debugger;
    return (
            <div className={s.item}> 
                <div className={s.img} >
                    <img src={props.img} alt="" />
                </div>
            </div>
        ); 
}

export default  Ava;