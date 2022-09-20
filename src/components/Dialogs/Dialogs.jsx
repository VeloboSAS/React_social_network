import React from "react";
import { NavLink } from "react-router-dom";
import s from './Dialogs.module.css';

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;

    const style = ({ isActive }) => ({
        fontWeight: isActive ? 'bold' : 'normal',
        color: isActive ? 'blue' : 'blueviolet',
      });

    return (
        <div className={s.dialog + ' ' + s.active}>
            <NavLink to={path} style={style}>{props.name}</NavLink>
        </div>
    );
};

const Message = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

const Dialogs = (props) => {

    let dialogsElement = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>)

    let messagesElement = props.state.messages.map(m => <Message message={m.message}/>)
    return (
            <div className={s.dialogs}>
                <div className={s.dialogsItems }>
                    { dialogsElement }
                </div>
                
                <div className={s.messages}>
                    { messagesElement }
                </div>
            </div>
    );
    
}

export default Dialogs;