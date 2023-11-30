import { Field, Form, Formik } from "formik"
import React, { FC, memo } from "react"
import { FilterType } from "../../Redux/usersReducer"
import { getUsersFilter } from "../../Redux/usersSelectors"
import {  useSelector } from 'react-redux'


const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type FriendFormType = "true" | "false" | "null" 
type FormType = {
    term:string
    friend: FriendFormType
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

export const UsersSearchForm: FC<PropsType> = memo((props) => {

    const filter = useSelector(getUsersFilter)
    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
 
         props.onFilterChanged(filter)
         setSubmitting(false)
     }
    return <div>
        <Formik
          enableReinitialize
          initialValues={{term: filter.term, friend: String(filter.friend) as FriendFormType }}
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