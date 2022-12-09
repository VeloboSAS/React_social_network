import React from "react";
import s from './Users.module.css';

const Users = (props) => {

    if ( props.users.length === 0) {
        props.setUsers( [
        
        {   id: 1,
            photoUrl: "https://avatars.mds.yandex.net/i?id=b24d083b576ed7b4e19387c4a48058f6e1f71d23-7755770-images-thumbs&n=13",
            followed: false,
            fullName: "Alex",
            status: "A'm a boss",
            location: {city: "Minsk", country: "Belarus"}},
        {   id: 2,
            photoUrl: "https://avatars.mds.yandex.net/i?id=b24d083b576ed7b4e19387c4a48058f6e1f71d23-7755770-images-thumbs&n=13",
            followed: false,
            fullName: "Nastya",
            status: "A'm a boss too",
            location: {city: "Moskow", country: "Russia"}},
        {   id: 3,
            photoUrl: "https://avatars.mds.yandex.net/i?id=b24d083b576ed7b4e19387c4a48058f6e1f71d23-7755770-images-thumbs&n=13",
            followed: true,
            fullName: "Alina",
            status: "A'm a boss too",
            location: {city: "Sochi", country: "Russia"}},
        {   id: 4,
            photoUrl: "https://avatars.mds.yandex.net/i?id=b24d083b576ed7b4e19387c4a48058f6e1f71d23-7755770-images-thumbs&n=13",
            followed: true,
            fullName: "Artem",
            status: "A'm a boss too",
            location: {city: "Paris", country: "France"}},
        ]
        )
    }

    return <div className={s.users}>
            <div>
                <h3 style={{color: "purple"}}>Users</h3>
            </div>
            <div>
                {
                props.users.map( (u, index) => <div key={index} className={s.content}>
                        <span>
                            <div>
                                <img src={u.photoUrl} className={s.photoUrl} alt=""/>
                            </div>
                            <div>
                                { u.followed ? <button onClick={ () => {props.unfollow(u.id)}}>Unfollow</button>
                                : <button onClick={ () => {props.follow(u.id)}}>Follow</button>}
                            </div>
                        </span>
                        <span>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </span>
                    </div>)
                }
            </div>
        </div>   

    
}

export default Users;