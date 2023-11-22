import MyPosts from './MyPosts';
import { actions} from '../../../Redux/profileReducer.tsx';
import { connect } from 'react-redux';


let mapStateToProps = (state) => {
    return {
        posts: state.profilePages.posts,
        newPostText: state.profilePages.newPostText,
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