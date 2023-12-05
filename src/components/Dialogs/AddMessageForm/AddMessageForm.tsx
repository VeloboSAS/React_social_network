import React, { FC } from 'react'
import {required, maxLengthCreator, minLengthCreator} from '../../../utils/validators/validators'
import { NewMessageFormValuesType } from '../Dialogs'
import { createField, Textarea } from "../../common/FormsControls/FormControls"
import s from  '../Dialogs.module.css'
import { InjectedFormProps, reduxForm } from 'redux-form'
import buttonStyle from '../../../App.module.css'

const maxLength100 = maxLengthCreator(100)
const minLength2 = minLengthCreator(2)

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>

type PropsType = {}

const AddMessageForm: FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {

    return (
        <form className={s.addMessages} onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormValuesKeysType>("Enter your message", "newMessageBody",
                                                     [required, maxLength100, minLength2], Textarea)}    
            </div>
            <div>
            <button className={buttonStyle.btn} >Добавить Пост</button>

            </div>     
        </form>
    )}

export default reduxForm<NewMessageFormValuesType>({form: 'dialogAddMessageForm'})(AddMessageForm)    