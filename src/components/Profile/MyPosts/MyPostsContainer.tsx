import MyPosts, { DispatchMyPostsPropsType, MapMyPostsPropsType } from './MyPosts'
import { actions} from '../../../Redux/profileReducer'
import { connect } from 'react-redux'
import { AppStateType } from '../../../Redux/redux-store'

let mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
    }
}

const MyPostsContainer = connect<MapMyPostsPropsType, DispatchMyPostsPropsType, {}, AppStateType>
(mapStateToProps, {addPost: actions.addPostActionCreator})
(MyPosts)

export default  MyPostsContainer