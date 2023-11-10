import React from "react";
import s from './Profile.module.css';
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({isOwner, savePhoto, profile, status, updateStatus, store, saveProfile}) => {

    return (
        <div className={s.content}>
            <ProfileInfo isOwner={isOwner}
                        savePhoto={savePhoto}
                        profile={profile}
                        status={status}
                        saveProfile={saveProfile}
                        updateStatus={updateStatus}/>
            <MyPostsContainer store={store} />
        </div>
        );   
}

export default  Profile;