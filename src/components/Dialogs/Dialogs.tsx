import React, { FC } from "react"
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem"
import Message from "./Message/Message"
import { InitialStateType } from "../../Redux/Reducers/dialogsReducer"
import AddMessageForm from "./AddMessageForm/AddMessageForm"

type PropsType = {
    dialogsPage: InitialStateType
    sendMessage: (newMessageBody: string) => void
}

export type NewMessageFormValuesType = {
    newMessageBody: string
} 

const Dialogs: FC<PropsType> = (props) => {
    let state = props.dialogsPage;

    let dialogsElement = state.dialogs.map(d => <DialogItem img={d.img} name={d.name} key={d.id} id={d.id}/>)
    let messagesElement = state.messages.map(m => <Message message={m.message} key={m.id}/>)

    let addNewMesssage = (values: NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody);
    }
    return (
        <>
            <div>
                <h3 className={s.title}>Messages</h3>
            </div>
            <div className={s.dialogs}>
                <div className={s.dialogsItems }>
                    { dialogsElement }
                </div>
                
                <div className={s.messages}>
                    <div>{ messagesElement }</div>
                    <AddMessageForm onSubmit={addNewMesssage}/>
                </div>
            </div>
            </>
    ); 
}

export default Dialogs