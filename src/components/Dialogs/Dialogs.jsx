import React from "react";
import { NavLink } from "react-router-dom";
import s from './Dialogs.module.css';
import {addMessageActionCreator} from '../../State/State';

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;

    const style = ({ isActive }) => ({
        fontWeight: isActive ? 'bold' : 'normal',
        color: isActive ? 'blue' : 'blueviolet',
      });

    return (
        <>
            {/* <Ava img={props.img} id={props.id}/> */}
            <div className={s.dialog + ' ' + s.active}>
                <NavLink to={path} style={style}>{props.name}</NavLink>
            </div>
        </>
    );
};

const Message = (props) => {

    return (
            <div className={s.message}>{props.message}</div>
                
    )
}

const Dialogs = (props) => {

    let dialogsElement = props.state.dialogs.map(d => <DialogItem img={d.img} name={d.name} key={d.id} id={d.id}/>)

    let messagesElement = props.state.messages.map(m => <Message message={m.message} key={m.id}/>)

    let newMessagesElement = React.createRef();

    let addMessage = () => {

        let text = newMessagesElement.current.value;
        props.dispatch(addMessageActionCreator(text));
        newMessagesElement.current.value = '';
    }    

    return (
            <div className={s.dialogs}>
                <div className={s.dialogsItems }>
                    { dialogsElement }
                </div>
                
                <div className={s.messages}>
                    { messagesElement }
                    <div className={s.addMessages}>
                        <div>
                            <textarea rows="1" cols="17" ref={newMessagesElement}></textarea>
                        </div>    
                        <div>   
                            <button className={s.button} onClick={ addMessage }>Add Message</button>
                        </div>
                    </div>
                </div>
            </div>
    );
    
}

export default Dialogs;