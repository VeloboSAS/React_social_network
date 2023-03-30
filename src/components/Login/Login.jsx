import React from "react";
import { Field, reduxForm } from 'redux-form';
import { Input } from "../FormsControls/FormControls";
import { required, maxLengthCreator, minLengthCreator  } from "../../utils/validators/validators";

const maxLength10 = maxLengthCreator(10);
const minLength2 = minLengthCreator(2)

const LoginForm = (props) => {

    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={'Login'} component={Input} name={"Login"} validate={[required, maxLength10, minLength2]}/>
                </div>
                <div>
                    <Field placeholder={'Password'} component={Input} name={"Password"} validate={[required, maxLength10, minLength2]}/>
                </div>
                <div>
                    <Field type={"checkbox"} component={Input} name={"Remember Me"}/>Remember me
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