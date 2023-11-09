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
            <b>My professional skills</b>: {profile.lookingForAJobDescription}
            {createField("My professional skills", "lookingForAJobDescription", [], Textarea)}
        </div>
    <div>
        <b>About me</b>: {createField("About me", "About me", [], Textarea)}
    </div>
    {/* <div>
        <b>Contacts</b>: {Object.keys(profile.contacts).map(key =>{
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
    </div> */}
</form>
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;