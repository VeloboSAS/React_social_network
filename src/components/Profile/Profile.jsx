import React from "react";
import s from './Profile.module.css';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import myimg from '../../images/fon.jpg';

const Profile = ({isOwner, savePhoto, profile, status, updateStatus, store, saveProfile}) => {

    return (
        <div >
            <div>
                <img className={s.img} src={myimg} alt=""/>
            </div>
            <div className={s.content}>
                <ProfileInfo isOwner={isOwner}
                            savePhoto={savePhoto}
                            profile={profile}
                            status={status}
                            saveProfile={saveProfile}
                            updateStatus={updateStatus}/>
                <MyPostsContainer store={store} />
            </div>
        </div>
        );   
}

export default  Profile;