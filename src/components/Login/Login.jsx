import React from "react";
import { reduxForm } from 'redux-form';
import { Input } from "../common/FormsControls/FormControls";
import { required, maxLengthCreator, minLengthCreator  } from "../../utils/validators/validators";
import { connect } from 'react-redux';
import { login } from "../../Redux/authReducer.tsx";
import { Navigate }  from 'react-router-dom';
import s from '../common/FormsControls/FormControls.module.css';
import { createField } from "../common/FormsControls/FormControls";

const maxLength20 = maxLengthCreator(20);
const minLength2 = minLengthCreator(2)

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
    return (
            <form onSubmit={handleSubmit}>

                    {createField("Email", "email", [required, maxLength20, minLength2], Input)}
                    {createField("Password", "password", [required, maxLength20, minLength2], Input, {type: "password"})}    
                    {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "Remember me" )}

                    {captchaUrl && <img src={captchaUrl} alt=''/>} 
                    {captchaUrl && createField("Symbols from image", "captcha", [required], Input, {} )}

                    { error && <div className={s.formSummaryError}>
                        {error}
                        </div> }
                <div>
                    <button className={s.btn}>Login</button>
                </div>
            </form>
    );  
}

const LoginReduxForm = reduxForm({form: 'Login'})(LoginForm)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (props.isAuth) {
        return <Navigate replace to="/profile"/>
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    );  
}

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps, {login})(Login);