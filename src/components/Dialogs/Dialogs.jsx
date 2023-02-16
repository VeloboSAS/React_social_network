import React from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Navigate } from "react-router-dom"


const Dialogs = (props) => {
    let state = props.dialogsPage;

    let dialogsElement = state.dialogs.map(d => <DialogItem img={d.img} name={d.name} key={d.id} id={d.id}/>)
    let messagesElement = state.messages.map(m => <Message message={m.message} key={m.id}/>)

    let newMessageBody = state.newMessageBody;

    let onSendMessageClick = () => {
        props.sendMessage();

    } 
    
    let onNewMessageChange = (e) => {
        let body = e.target.value;
        props.updateNewMessageBody(body);
    }

    if (!props.isAuth) return <Navigate to={'/login'} />;

    return (
        <>
            <div>
                <h3 style={{color: 'purple'}}>Messages</h3>
            </div>
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
            </>
    );
    
}

export default Dialogs;