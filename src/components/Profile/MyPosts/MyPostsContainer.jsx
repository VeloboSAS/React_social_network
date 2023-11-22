import MyPosts from './MyPosts';
import { actions} from '../../../Redux/profileReducer.ts';
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(actions.addPostActionCreator(newPostText));
        },
    }}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default  MyPostsContainer;