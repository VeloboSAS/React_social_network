import React from "react";
import s from './Ava.module.css';
// import ava from './ava.jpeg';
// import name_1 from '../../../State/1.jpg';
// import name_2 from '../../../State/2.jpg';
// import name_3 from '../../../State/3.jpg';
// import name_4 from '../../../State/4.jpg';


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