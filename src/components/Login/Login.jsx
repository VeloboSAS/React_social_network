import React from "react";
import { Field, reduxForm } from 'redux-form';
import { Input } from "../FormsControls/FormControls";
import { required, maxLengthCreator, minLengthCreator  } from "../../utils/validators/validators";
import { connect } from 'react-redux';
import { login } from "../../Redux/authReducer";
import { Navigate }  from 'react-router-dom';

const maxLength20 = maxLengthCreator(20);
const minLength2 = minLengthCreator(2)

const LoginForm = (props) => {

    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={'Email'} component={Input} name={"email"} validate={[required, maxLength20, minLength2]}/>
                </div>
                <div>
                    <Field placeholder={'Password'} component={Input} name={"password"} validate={[required, maxLength20, minLength2]} type={"password"}/>
                </div>
                <div>
                    <Field type={"checkbox"} component={Input} name={"rememberMe"}/>Remember me
                </div>
                <div>
                    <button>Login</button>
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