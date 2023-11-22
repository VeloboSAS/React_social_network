import axios from 'axios';
import { UsersType } from '../Types/types';

export const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "key"
    },
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptrchaIsRequired = 10
}

export enum ResultCodesForCaptchaEnum {
    CaptrchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}

export type ApiResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}