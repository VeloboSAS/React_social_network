import React, { FC, ReactNode } from "react";
import s from './FormControls.module.css';
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form';
import { FieldValidatorType } from "../../../utils/validators/validators";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps,
    children: string | ReactNode 
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

export const Textarea: FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
    
}

export const Input: FC<WrappedFieldProps> = (props) => {
    const {input, meta,...restProps} = props
    return  <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export function createField<FormKeysType extends string>(placeholder: string | undefined, name: FormKeysType,
     validators: Array<FieldValidatorType>,
      component: FC<WrappedFieldProps>,
       props={}, text="") {
        return <div>
            <Field placeholder={placeholder}
                    name={name}
                    validate={validators}
                    component={component}
                    {...props}/>{text}
                </div>

       }

export type GetStringKeys<T> = Extract<keyof T, string>      