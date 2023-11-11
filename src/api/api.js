import axios from 'axios';

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
    async getPage(pageNumber, pageSize=10) {
        const response = await instance.get(`users?page=${pageNumber}&count=${pageSize}`);
        return response.data;
    },

    async follow(id) {
        const response = await instance.post(`follow/${id}`, {});
        return response.data;
    },
    async unfollow(id) {
        const response = await instance.delete(`follow/${id}`);
        return response.data;
    },
    async getProfile(id) {
        console.warn('Obsolete method. Please profileAPI object')
        return profileAPI.getProfile(id)
    }

}

export const profileAPI = {
    async getProfile(id) {
        return await instance.get(`profile/${id}`);
    },

    async getStatus(id) {
        return await instance.get(`profile/status/${id}`);
    },
    async updateStatus(status) {
        return await instance.put(`profile/status/`, { status });
    },
    async savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return await instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        });
    },
    async saveProfile(profile) {
        return await instance.put(`profile`, profile);
    },
}

export const authAPI = {
    async me() {
        return await instance.get(`auth/me`);
    },
    async login (email, password, rememberMe=false, captcha=null) {
        return instance.post('auth/login', { email, password, rememberMe, captcha });
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



