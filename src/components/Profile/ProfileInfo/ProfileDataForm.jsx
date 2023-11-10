import React from "react";
import { reduxForm } from "redux-form";
import { createField, Textarea } from "../../common/FormsControls/FormControls";
import s from './ProfileInfo.module.css';
import { Input } from "../../common/FormsControls/FormControls";

const ProfileDataForm = ({profile, handleSubmit}) => {
    return <form onSubmit={handleSubmit}>
   <div><button  className={s.btn}>save</button></div>
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
</form>
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;