import {FC} from "react"
import {Users} from "./Users"
import Preloader from "../common/Preloader/Preloader"
import { getIsFetching  } from "../../Redux/usersSelectors"
import {  useSelector } from 'react-redux'

type UsersPagePropsType = {
    pageTitle: string
}

const UsersPage: FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return <>
            <h2 style={{textAlign:'center'}}>{props.pageTitle}</h2>
            {isFetching ? <Preloader isFetching={false} />: null}
            <Users/> 
        </>
}

export default UsersPage