const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
    users:  []
        // { id: 1, photoUrl: "https://avatars.mds.yandex.net/i?id=b24d083b576ed7b4e19387c4a48058f6e1f71d23-7755770-images-thumbs&n=13",
        //  followed: false, fullName: "Alex",status: "A'm a boss", location: {city: "Minsk", country: "Belarus"}},
        // { id: 2, photoUrl: "https://avatars.mds.yandex.net/i?id=b24d083b576ed7b4e19387c4a48058f6e1f71d23-7755770-images-thumbs&n=13",
        // followed: false, fullName: "Nastya",status: "A'm a boss too", location: {city: "Moskow", country: "Russia"}},
        // { id: 3, photoUrl: "https://avatars.mds.yandex.net/i?id=b24d083b576ed7b4e19387c4a48058f6e1f71d23-7755770-images-thumbs&n=13",
        // followed: true, fullName: "Alina",status: "A'm a boss too", location: {city: "Sochi", country: "Russia"}},
        // { id: 4, photoUrl: "https://avatars.mds.yandex.net/i?id=b24d083b576ed7b4e19387c4a48058f6e1f71d23-7755770-images-thumbs&n=13",
        // followed: true, fullName: "Artem",status: "A'm a boss too", location: {city: "Paris", country: "France"}},
    //   ]
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case FOLLOW:
            return {...state,
                 users: state.users.map( u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })

                }
        case UNFOLLOW:
            return {...state,
            users: state.users.map( u => {
            if (u.id === action.userId) {
                return {...u, followed: false}
            }
            return u;
        })
        }
        case SET_USERS: {
            return {
                ...state, users: [...state.users, ...action.users]
            }
        }
        default:  return state;     
    }
}

export const followAC = (userId) => ({type: FOLLOW, userId})

export const unfollowAC = (userId) => ({type: UNFOLLOW, userId})

export const setUsersAC = (users) => ({type: SET_USERS, users})

    
export default usersReducer;