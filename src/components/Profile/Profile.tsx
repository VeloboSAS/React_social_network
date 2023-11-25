import React, { FC } from "react"
import s from './Profile.module.css'
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import ProfileInfo from "./ProfileInfo/ProfileInfo"
import myimg from '../../images/fon.jpg'
import { ProfileType } from "../../Types/types"


type PropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    savePhoto: (File: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const Profile: FC<PropsType> = (props) => {

    return (
        <div >
            <div>
                <img className={s.img} src={myimg} alt=""/>
            </div>
            <div className={s.content}>
                <ProfileInfo
                            isOwner={props.isOwner}
                             savePhoto={props.savePhoto}
                             profile={props.profile}
                             status={props.status}
                             saveProfile={props.saveProfile}
                             updateStatus={props.updateStatus}
                            />
                <MyPostsContainer/>
            </div>
        </div>
        ) }  


export default  Profile