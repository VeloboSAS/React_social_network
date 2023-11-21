import React from "react";
import { reduxForm } from "redux-form";
import { createField, Textarea } from "../../common/FormsControls/FormControls";
import s from './ProfileInfo.module.css';
import buttonStyle from '../../../App.module.css'
import { Input } from "../../common/FormsControls/FormControls";

const ProfileDataForm = ({profile, handleSubmit, error}) => {
    return <form onSubmit={handleSubmit}>
            <div><button  className={buttonStyle.btn}>Сохранить</button></div>
            { error && <div className={s.formSummaryError}>
                        {error}
                        </div> }
                <div>
                    <b>Full name</b>: {createField("Full Name", "fullName", [], Input)}
                </div>
                <div>
                    <b>Looking for a job</b> :{createField("", "lookingForAJob", [], Input, {type: "checkbox"})}
                </div>
                    <div>
                        <b>My professional skills</b>:
                        {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
                    </div>
                <div>
                    <b>About me</b>: {createField("About me", "aboutMe", [], Textarea)}
                </div>
                <div>
                    <b>Contacts</b>: {Object.keys(profile.contacts).map(key =>{
                        return <div key={key} className={s.contact}>
                            <b>{key}: {createField(key, "contacts." + key.toLocaleLowerCase(), [], Input)}</b>
                        </div>
                    })}
                </div>
            </form>
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;