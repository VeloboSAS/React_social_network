import React, { FC } from "react"
import { InjectedFormProps, reduxForm} from 'redux-form'
import {required, maxLengthCreator, minLengthCreator} from '../../../../utils/validators/validators'
import { createField, GetStringKeys, Textarea } from "../../../common/FormsControls/FormControls"
import buttonStyle from '../../../../App.module.css'
import s from './../MyPosts.module.css'

const maxLength10 = maxLengthCreator(10)
const minLength2 = minLengthCreator(2)

type PropsType = {

}
export type AddPostFormValuesType = {
    newPostText: string
}

type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

export const AddNewPostForm: FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.addPost}>
            <div>
                {createField<AddPostFormValuesTypeKeys>("Your Post", "newPostText", [required, maxLength10, minLength2], Textarea)}    
            </div>
            <div>
                <button className={buttonStyle.btn} >Добавить Пост</button>
            </div> 
            </div>    
        </form>
    )
}

export const AddNewPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

