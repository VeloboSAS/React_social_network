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

}

