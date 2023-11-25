import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import Ava from '../Ava/Ava';
import s from '../Dialogs.module.css';

type PropsType = {
    id: number
    img: string
    name: string
}

const DialogItem: FC<PropsType> = (props) => {
    let path = "/dialogs/" + props.id;

    //@ts-ignore
    const style = ({ isActive }) => ({
        fontWeight: isActive ? 'bold' : 'normal',
        color: isActive ? 'blue' : 'blueviolet',
      });

    return (
        <>
            <Ava img={props.img} name={props.name}/>

            <div className={s.dialog + ' ' + s.active}>
                <NavLink to={path} style={style} >{props.name}</NavLink>
            </div>
        </>
    );
};

export default DialogItem;