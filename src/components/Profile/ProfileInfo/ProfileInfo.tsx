import React, {ChangeEvent, FC, useState} from "react"
import Preloader from "../../common/Preloader/Preloader"
import s from './ProfileInfo.module.css'
import buttonStyle from '../../../App.module.css'
import inputFile from '../../../App.module.css'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhoto from '../../../images/user.jpg'
import ProfileDataForm from "./ProfileDataForm"
import { ContactsType, ProfileType } from "../../../Types/types"

type PropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    savePhoto: (File: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: FC<PropsType> = ({isOwner, profile, status, updateStatus, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader isFetching={false} />}

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length) {
                savePhoto(e.target.files[0])
            }
    }

    const onSubmit =  (formData: ProfileType) => {
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
                    <label className={inputFile.inputFile}>
                        <input className={inputFile.input} type={"file"} onChange={onMainPhotoSelected}/>		
                        <span>Сhoose File</span>
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
        )   
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return <div style={{marginLeft: '30px'}}>
                <div>
                    {isOwner && <div><button onClick={goToEditMode} className={buttonStyle.btn}>Edit</button></div>}
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
                        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
                    })}
                </div>
            </div>
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
const Contact: FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
}

export default  ProfileInfo