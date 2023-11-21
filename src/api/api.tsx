import axios from 'axios';
import { ProfileType } from '../Types/types';

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "key"
    },
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
})

export const usersAPI = {
    async getUsers(currentPage=1, pageSize=10) {
        const response = await instance.get(`users?page=${currentPage}&count=${pageSize}`);
        return response.data;
    },
    async getPage(pageNumber: number, pageSize=10) {
        const response = await instance.get(`users?page=${pageNumber}&count=${pageSize}`);
        return response.data;
    },

    async follow(id: number) {
        const response = await instance.post(`follow/${id}`, {});
        return response.data;
    },
    async unfollow(id: number) {
        const response = await instance.delete(`follow/${id}`);
        return response.data;
    },
    async getProfile(id: number) {
        console.warn('Obsolete method. Please profileAPI object')
        return profileAPI.getProfile(id)
    }

}

export const profileAPI = {
    async getProfile(id: number) {
        return await instance.get(`profile/${id}`);
    },

    async getStatus(id: number) {
        return await instance.get(`profile/status/${id}`);
    },
    async updateStatus(status: string) {
        
        return await instance.put(`profile/status/`, { status });
    },
    async savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return await instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        });
    },
    async saveProfile(profile: ProfileType) {
        return await instance.put(`profile`, profile);
    },
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptrchaIsRequired = 10
}

export enum ResultCodesForCaptcha {
    CaptrchaIsRequired = 10
}

type MeResponseType = {
    data: { id: number, email: string, login: string}
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    resultCode: ResultCodesEnum | ResultCodesForCaptcha
    messages: Array<string>
    data: { userId: number}
}

export const authAPI = {
    async me() {
        return await instance.get<MeResponseType>(`auth/me`).then(res => res.data);
    },
    async login (email: string, password: string, rememberMe=false, captcha: null | string = null) {
        return instance.post<LoginResponseType>('auth/login', { email, password, rememberMe, captcha })
        .then(res => res.data);
    },
    async logout () {
        return instance.delete('auth/login');
    }
} 

export const securityAPI = {
     getCaptchaUrl() {
        return  instance.get(`security/get-captcha-url`);
    },

} 





