import React, {useState} from "react";
// import myimg from '../../../images/fon.jpg';
import Preloader from "../../common/Preloader/Preloader";
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../images/user.jpg';
import ProfileDataForm from "./ProfileDataForm";


const ProfileInfo = ({isOwner, profile, status, updateStatus, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
            if (e.target.files.length) {
                savePhoto(e.target.files[0])
            }
    }

    const onSubmit =  (formData) => {
         saveProfile(formData).then(() => {
            setEditMode(false)
         })
    }
    return (
        <>
            <div className={s.descriptionBlock}>
                <div className={s.PhotoBlock}>
                    <img src={profile.photos.large != null ? profile.photos.large : userPhoto} className={s.photo} alt={profile.fullName} />
                    { isOwner && 
                    <label className={s.inputFile}>
                        <input className={s.input} type={"file"} onChange={onMainPhotoSelected}/>		
                        <span>Выберите файл</span>
                    </label>
}
                </div>
                <div>
                { editMode ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                 :<ProfileData goToEditMode={() => {setEditMode(true)}} profile={profile} isOwner={isOwner}/>}
                </div>
                <div className={s.status}>
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                </div>

            </div>
        </>
        );   
}

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
                <div>
                    {isOwner && <div><button onClick={goToEditMode} className={s.btn}>Редактировать</button></div>}
                </div>
                <div>
                    <b>Full name</b>: {profile.fullName}
                </div>
                <div>
                    <b>Looking for a job</b> : {profile.lookingForAJob ? "yes" : "no"}
                </div>
                {profile.lookingForAJob &&
                    <div>
                        <b>My professional skills</b>: {profile.lookingForAJobDescription}
                    </div>
                }
                <div>
                    <b>About me</b>: {profile.aboutMe}
                </div>
                <div></div>
                <div>
                    <b>Contacts</b>: {Object.keys(profile.contacts).map(key =>{
                        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                    })}
                </div>
            </div>
}

const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default  ProfileInfo;