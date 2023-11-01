import React from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Navigate } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import { Textarea } from "../common/FormsControls/FormControls";
import {required, maxLengthCreator, minLengthCreator} from '../../utils/validators/validators';

const Dialogs = (props) => {
    let state = props.dialogsPage;

    let dialogsElement = state.dialogs.map(d => <DialogItem img={d.img} name={d.name} key={d.id} id={d.id}/>)
    let messagesElement = state.messages.map(m => <Message message={m.message} key={m.id}/>)

    let addNewMesssage = (values) => {
        props.sendMessage(values.newMessageBody);
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
                    <AddMessageFormRedux onSubmit={addNewMesssage}/>
                </div>
            </div>
            </>
    ); 
}

const maxLength100 = maxLengthCreator(100);
const minLength2 = minLengthCreator(2)

const AddMessageForm = (props) => {
    return (
        <form className={s.addMessages} onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name={"newMessageBody"}  placeholder={"Enter your message"} validate={[required, maxLength100, minLength2]}/>
            </div>
            <div>
                <button className={s.button} >Send Message</button>
            </div>     

        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)

export default Dialogs;