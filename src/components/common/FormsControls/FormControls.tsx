import React, { Component, FC, ReactNode } from "react";
import s from './FormControls.module.css';
import { Field } from 'redux-form';
import { FieldValidatorType } from "../../../utils/validators/validators";

type FormControlPropsType = {
    meta: {
        touched: boolean
        error: string
    },
    children: ReactNode
}

const FormControl: FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {

    const hasError = touched && error;
    return (
        <div className={s.formControl + " " + (hasError ? s.error: "") }>
            <div>
                {children}
            </div>
            <div>
                { hasError && <span className={s.text}>{error}</span> }
            </div>
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
    
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props
    return  <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export const createField = (placeholder: string, name: string,
     validators: Array<FieldValidatorType>,
      component: string | Component | FC,
       props={}, text="") => (
    <div>
        <Field placeholder={placeholder}
                name={name}
                validate={validators}
                component={component}
                {...props}/>{text}
    </div>
)