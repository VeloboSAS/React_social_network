import React from "react";
import myimg from '../../../images/fon.jpg';
import Preloader from "../../Preloader/Preloader";
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks'


const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <>
            <div className={s.img}>
                <img src={myimg} alt=""/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large} className={s.photo} alt={props.profile.fullName} />
                <div>
                    <h3 className={s.name}>{props.profile.fullName}</h3>
                    <h5>{props.profile.aboutMe}</h5>
                </div>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </>
        );
    
}

export default  ProfileInfo;