import React from "react";
import myimg from '../../../images/fon.jpg';
import Preloader from "../../common/Preloader/Preloader";
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../images/user.jpg';


const ProfileInfo = ({isOwner, profile, status, updateStatus, savePhoto}) => {
    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
            if (e.target.files.length) {
                savePhoto(e.target.files[0])
            }
    }
    return (
        <>
            <div className={s.img}>
                <img src={myimg} alt=""/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large != null ? profile.photos.large : userPhoto} className={s.photo} alt={profile.fullName} />
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                <div>
                    <h3 className={s.name}>{profile.fullName}</h3>
                    <h5>{profile.aboutMe}</h5>
                </div>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </>
        );
    
}

export default  ProfileInfo;