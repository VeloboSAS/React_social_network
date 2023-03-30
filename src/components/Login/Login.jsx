import React from "react";
import { Field, reduxForm } from 'redux-form';

const LoginForm = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={'Login'} component="input" name={"Login"}/>
                </div>
                <div>
                    <Field placeholder={'Password'} component="input" name={"Password"}/>
                </div>
                <div>
                    <Field type={"checkbox"} component="input" name={"Remember Me"}/>Remember me
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
        console.log(formData)
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );  
}

export default Login;