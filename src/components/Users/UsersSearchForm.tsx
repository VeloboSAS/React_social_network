import { Field, Form, Formik } from "formik"
import React, { FC, memo } from "react"
import { FilterType } from "../../Redux/usersReducer"


const usersSearchFormValidate = (values: any) => {
    const errors = {}
         return errors
}

type FormType = {
    term: string,
    friend: "true" | "false" | "null"
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: FC<PropsType> = memo((props) => {

    const submit = (values: FormType , { setSubmitting }: {setSubmitting: (isSubmiting: boolean) => void}) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null: values.friend === "true" ? true: false
        }
        props.onFilterChanged(filter)
        setSubmitting(false)
    }
    return <div>
        <Formik
       initialValues={{term: '', friend: 'null' }}
       validate={usersSearchFormValidate}
       onSubmit={submit}
       >

       {({ isSubmitting }) => (
         <Form>
           <Field type="text" name="term" />
           <Field name="friend" component="select">
                <option value="null">All</option>
                <option value="true">Only followed</option>
                <option value="false">Only unfollowed</option>
            </Field>
           <button type="submit" disabled={isSubmitting}>
             Find
           </button>
         </Form>
       )}
     </Formik>
    </div>
})