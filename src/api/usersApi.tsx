import { GetItemsType, instance, ApiResponseType } from "./api"

export const usersAPI = {
    async getUsers(currentPage=1, pageSize=10) {
        return await instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`).then(res => res.data)

    },
    // async getPage(pageNumber: number, pageSize=10) {
    //     const response = await instance.get(`users?page=${pageNumber}&count=${pageSize}`)
    //     return response.data
    // },

    async follow(id: number) {
        const res = await instance.post<ApiResponseType>(`follow/${id}`, {})
        return res.data
    },
    unfollow(id: number) {
        return instance.delete(`follow/${id}`).then(res => res.data) as Promise<ApiResponseType>
  
    },
}