import React from "react";
import { reduxForm } from 'redux-form';
import { Input } from "../common/FormsControls/FormControls";
import { required, maxLengthCreator, minLengthCreator  } from "../../utils/validators/validators";
import { connect } from 'react-redux';
import { login } from "../../Redux/authReducer";
import { Navigate }  from 'react-router-dom';
import s from '../common/FormsControls/FormControls.module.css';
import { createField } from "../common/FormsControls/FormControls";

const maxLength20 = maxLengthCreator(20);
const minLength2 = minLengthCreator(2)

const LoginForm = ({handleSubmit, error}) => {
    return (
            <form onSubmit={handleSubmit}>

                    {createField("Email", "email", [required, maxLength20, minLength2], Input)}
                    {createField("Password", "password", [required, maxLength20, minLength2], Input, {type: "password"})}    
                    {createField(null, "rememberMe", [], Input, {type: "checkbox"}, "Remember me" )}   
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
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Navigate replace to="/profile"/>
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );  
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);