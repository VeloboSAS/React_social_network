import React from "react";
import { NavLink } from "react-router-dom";
import s from './Dialogs.module.css';

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;

    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    );
};

const Message = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

const Dialogs = (props) => {

    let dialogsData = [
        {id: 1, name: 'Alex'},
        {id: 2, name: 'Nastya'},
        {id: 3, name: 'Alina'},
        {id: 4, name: 'Artem'},

    ];

    let messagesData = [
        {id: 1, message: "Hi"},
        {id: 2, message: "Hi Hi"},
        {id: 3, message: 'Hello World'}

    ];
    return (
            <div className={s.dialogs}>
                <div className={s.dialogsItems}>
                        <DialogItem id={dialogsData[0].id} name={dialogsData[0].name}/>
                        <DialogItem id={dialogsData[1].id} name={dialogsData[1].name}/>
                        <DialogItem id={dialogsData[2].id} name={dialogsData[2].name}/>
                        <DialogItem id={dialogsData[3].id} name={dialogsData[3].name}/>
                </div>
                <div className={s.messages}>
                    <Message id={messagesData[0].id} message={messagesData[0].message}/>
                    <Message id={messagesData[1].id} message={messagesData[1].message}/>
                    <Message id={messagesData[2].id} message={messagesData[2].message}/>
                </div>
            </div>
    );
    
}

export default Dialogs;