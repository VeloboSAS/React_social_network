import { PhotosType, ProfileType } from '../Types/types'
import { instance, ApiResponseType } from './api'

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    async getProfile(id: number) {
        return await instance.get<ProfileType>(`profile/${id}`).then(res => res.data)
    },

    async getStatus(id: number) {
        return await instance.get<string>(`profile/status/${id}`).then(res => res.data)
    },
    async updateStatus(status: string) {
        return await instance.put<ApiResponseType>(`profile/status/`, { status }).then(res => res.data)
    },
    async savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append("image", photoFile)
        return await instance.put<ApiResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    async saveProfile(profile: ProfileType) {
        return await instance.put<ApiResponseType>(`profile`, profile).then(res => res.data)
    },
}
