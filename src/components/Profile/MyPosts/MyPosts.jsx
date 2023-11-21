import React from "react"
import s from './MyPosts.module.css'
import buttonStyle from '../../../App.module.css'
import Post from './Posts/Post'
import { Field, reduxForm } from 'redux-form'
import {required, maxLengthCreator, minLengthCreator} from '../../../utils/validators/validators'
import { Textarea } from "../../common/FormsControls/FormControls"

const maxLength10 = maxLengthCreator(10);
const minLength2 = minLengthCreator(2)


const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={s.addPost}>
            <div>
                <Field component={Textarea} name={"newPostText"}  placeholder={"Post Message"} validate={[required, maxLength10, minLength2]}/>
            </div>
            <div>
                <button className={buttonStyle.btn} >Добавить Пост</button>
            </div> 
            </div>    
        </form>
    )
}

const AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)


const MyPosts = React.memo(props => {

        let postsElements = [...props.posts]
        .reverse()
        .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount} />);
       
        let onAddPost = (values) => {
            props.addPost(values.newPostText);
        }


        return (
            <div>
                <h3 className={s.title}>My Posts</h3>
                <AddNewPostFormRedux onSubmit={onAddPost}/>
                <div className={s.posts}>
                    { postsElements }
                </div>
            </div>
        ); 
});


export default  MyPosts;