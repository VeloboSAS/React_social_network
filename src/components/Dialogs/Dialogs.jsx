import React from "react";
import { NavLink } from "react-router-dom";
import s from './Dialogs.module.css';
import {sendMessageCreator, updateNewMessageBodyCreator} from '../../Redux/dialogsReducer';
import Ava from './Ava/Ava';
 
const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;

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

const Message = (props) => {

    return (
            <div className={s.message}>{props.message}</div>
                
    )
}

const Dialogs = (props) => {

    let dialogsElement = props.state.dialogs.map(d => <DialogItem img={d.img} name={d.name} key={d.id} id={d.id}/>)
    let messagesElement = props.state.messages.map(m => <Message message={m.message} key={m.id}/>)

    let newMessageBody = props.state.newMessageBody;

    let onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator());

    } 
    
    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.store.dispatch(updateNewMessageBodyCreator(body));
    }

    return (
            <div className={s.dialogs}>
                <div className={s.dialogsItems }>
                    { dialogsElement }
                </div>
                
                <div className={s.messages}>
                    <div>{ messagesElement }</div>
                    <div className={s.addMessages}>
                        <div>
                            <textarea
                             value = {newMessageBody}
                             onChange = { onNewMessageChange }
                             rows="1" 
                             cols="17" 
                             placeholder="Enter your message"
                             ></textarea>
                        </div>    
                        <div>   
                            <button className={s.button} onClick={ onSendMessageClick }>Send Message</button>
                        </div>
                    </div>
                </div>
            </div>
    );
    
}

export default Dialogs;