import React, {FC} from "react";
import s from './Ava.module.css';

type PropsType = {
    img: string
    name: string
}

const Ava: FC<PropsType> = (props) => {
    return (
            <div className={s.item}> 
                <div className={s.img} >
                    <img src={props.img} alt={props.name} />
                </div>
            </div>
        ); }

export default  Ava;