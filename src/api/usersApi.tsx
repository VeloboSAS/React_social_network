import { GetItemsType, instance, ApiResponseType } from "./api"

export const usersAPI = {
    async getUsers(currentPage=1, pageSize=10, term: string = '', friend: null | boolean = null) {
        return await instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term} + (friend === null ? '': &friend=${friend})`)
        .then(res => res.data)

    },
   async follow(id: number) {
        return await instance.post<ApiResponseType>(`follow/${id}`).then(res => res.data)
    },
    unfollow(id: number) {
        return instance.delete(`follow/${id}`).then(res => res.data) as Promise<ApiResponseType>
  
    },
}