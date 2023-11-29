import {FC} from "react"
import {Users} from "./Users"
import Preloader from "../common/Preloader/Preloader"
import { getIsFetching  } from "../../Redux/usersSelectors"
import {  useSelector } from 'react-redux'


// type MapStatePropsType = {
//     currentPage: number
//     pageSize: number
//     isFetching: boolean
//     totalUsersCount: number
//     users: Array<UsersType>
//     followingInProgress: Array<number>
//     filter: FilterType
// }

// type MapDispatchPropsType = {
//     requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void
//     follow: (userId: number) => void
//     unfollow: (userId: number) => void

// }

// type OwnPropsType = {
//     pageTitle: string
// }

// type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType 

type UsersPagePropsType = {
    pageTitle: string
}

export const UsersPage: FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return <>
            <h2 style={{textAlign:'center'}}>{props.pageTitle}</h2>
            {isFetching ? <Preloader isFetching={false} />: null}
            <Users/> 
        </>
}

// class UsersContainer extends Component<PropsType> {

//     componentDidMount() {
//         const {currentPage, pageSize, filter} = this.props;
//         this.props.requestUsers(currentPage, pageSize, filter);
//     }

//     onPageChanged = (pageNumber: number) => {
//         const {pageSize, filter} = this.props;
//         this.props.requestUsers(pageNumber, pageSize, filter)
//     }

//     onFilterChanged = (filter: FilterType) => {
//         const {pageSize} = this.props;
//         this.props.requestUsers(1, pageSize, filter)
//     }
//     render() {
//         return <>
//                 <h2 style={{textAlign:'center'}}>{this.props.pageTitle}</h2>
//                 <Preloader isFetching={this.props.isFetching}/>
//                  <Users 
                        // pageSize={this.props.pageSize}
                        // totalUsersCount={this.props.totalUsersCount}
                        // currentPage={this.props.currentPage}
                        // onPageChanged={this.onPageChanged}
                        // onFilterChanged={this.onFilterChanged}
                        // users={this.props.users}
                        // follow={this.props.follow}
                        // unfollow={this.props.unfollow}
                        // followingInProgress={this.props.followingInProgress}
//                         /> 
//                 </>
//     }
// }

// let mapStateToProps = (state: AppStateType): MapStatePropsType  => {
//     return {
//         users: getUsers(state),
//         pageSize: getPageSize(state),
//         totalUsersCount: getTotalUsersCount(state),
//         currentPage: getCurrentPage(state),
//         isFetching: getIsFetching(state),
//         followingInProgress: getFollowingInProgress(state),
//         filter: getUsersFilter(state)
// }}
 
// export default compose<ComponentType>(
//     connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>
//     (mapStateToProps, {follow, unfollow, requestUsers: requestUsers}),
//     withAuthRedirect, 
// )(UsersContainer)



