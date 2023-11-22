import { instance, ApiResponseType, ResultCodesEnum, ResultCodesForCaptchaEnum } from './api';

type MeResponseDataType = {
    id: number
    email: string
    login: string
};
type LoginResponseDataType = {
    userId: number
};

export const authAPI = {
    async me() {
        return await instance.get<ApiResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data);
    },
    async login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ApiResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodesForCaptchaEnum>>('auth/login', { email, password, rememberMe, captcha })
            .then(res => res.data);
    },
    async logout() {
        return instance.delete('auth/login');
    }
};


