import React, { FC } from "react"
import s from './Ava.module.css'
// import ava from './ava.jpeg';

type PropsType = {
    id: number
    img:  string
}


const Ava: FC<PropsType> = (props) => {
    return (
                <div className={s.item}> 
                    <div className={s.img} >
                        <img src={props.img} id={props.id} alt="" />
                    </div>
                </div>
        ); 
}

export default  Ava