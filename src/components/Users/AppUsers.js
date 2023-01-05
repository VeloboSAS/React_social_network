import React, {useState, useEffect} from "react";
import Users from "./Users";
// import axios from "axios";



const AppUsers = (props) => {
    const [users, setUsers] = useState([])



    useEffect(() => {
        onPageChanged = (pageNumber) => {
            props.setCurrentPage(pageNumber);
            fetch(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${props.pageSize}`).then(
                response => response.json().then(data => {
                    setUsers(data)
                })
        )
    }, [])
        //    onPageChanged = (pageNumber) => {
            // this.props.setCurrentPage(pageNumber);
            // axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${props.pageSize}`).then( response => {
            //     setUsers(response.data.items)
            //     })
    // }
    // }, [])
    return (
        <div>
            <Users data={ users }/>
        </div>
    );
}

export default AppUsers;