import React, { FC } from "react"
import { InjectedFormProps, reduxForm } from 'redux-form'
import { Input } from "../common/FormsControls/FormControls"
import { required, maxLengthCreator, minLengthCreator  } from "../../utils/validators/validators"
import { connect } from 'react-redux'
import { login } from "../../Redux/authReducer"
import { Navigate }  from 'react-router-dom'
import s from '../common/FormsControls/FormControls.module.css'
import sl from './Login.module.css'
import buttonStyle from '../../App.module.css'
import { createField } from "../common/FormsControls/FormControls"
import { AppStateType } from "../../Redux/redux-store"

const maxLength20 = maxLengthCreator(20)
const minLength2 = minLengthCreator(2)

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
            <form onSubmit={handleSubmit} >
                    <div className={sl.loginForm}>
                            {createField<LoginFormValuesTypeKeys>("Email", "email", [required, maxLength20, minLength2], Input)}
                            {createField<LoginFormValuesTypeKeys>("Password", "password", [required, maxLength20, minLength2], Input, {type: "password"})}  
                            {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "Remember me" )}

                        {captchaUrl && <img src={captchaUrl} alt=''/>} 
                        {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [required], Input, {} )}
                    </div>
                    { error && <div className={s.formSummaryError}>
                        {error}
                        </div> }
                <div>
                    <button className={buttonStyle.btn}>Login</button>
                </div>
            </form>
    );  
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'Login'})(LoginForm)

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type MapDispatchPropstype = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>

const Login: FC<MapStatePropsType & MapDispatchPropstype> = ({login, isAuth, captchaUrl}) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (isAuth) {
        return <Navigate replace to="/profile"/>
    }
    return (
        <div className={sl.loginBlock}>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    );  
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, {login})(Login);