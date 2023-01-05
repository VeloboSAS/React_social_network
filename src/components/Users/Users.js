import React, {useState, useEffect } from "react";
import s from './Users.module.css';
import user from '../../images/user.jpg';
// import ReactPaginate from "react-paginate";

const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

        let pages = []

        for (let i=1; i <= pagesCount; i++) {
            pages.push(i);
        }

        let curP = props.currentPage;
        let curPF = ((curP - 5) < 0) ?  0  : curP - 5 ;
        let curPL = curP + 5;
        let slicedPages = pages.slice( curPF, curPL); 

    // const {data} = props;
    // const [currentUsers, setCurrentUsers] = useState([]);
    // const [pageCount, setPageCount] = useState(0);
    // const [itemOffset, setItemOffset] = useState(0);
    // const itemOffset = 0

    // const itemsPerPage = props.pageSize;
    // const totalUsersCount = props.totalUsersCount;

    // useEffect(() => {
    //     const endOffset = itemOffset + itemsPerPage;
    //     setCurrentUsers(props.users.slice(itemOffset, endOffset));
    //     setPageCount(Math.ceil(totalUsersCount /itemsPerPage));
    // }, [])


    // const [itemOffset, setItemOffset] = useState(0);

    // const endOffset = itemOffset + itemsPerPage;

    // const currentUsers = props.users.slice(itemOffset, endOffset);
    // const pageCount = Math.ceil(totalUsersCount / itemsPerPage);
  

    // const handlePageClick = (event) => {
    //   const newOffset = (event.selected * itemsPerPage) % totalUsersCount;

    //   setItemOffset(newOffset);
    // };


    return <div className={s.users}>
                <div>
                    <h3 style={{color: "purple"}}>Users</h3>
                </div>
                <div className={s.pagination}>
                    { slicedPages.map( p => {
                        return <span className={props.currentPage === p && s.selectedPage}
                        onClick={ (e) => {props.onPageChanged(p)}}>{p}</span>
                    })}
                </div>
                {/* <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    // onPageChange={handlePageClick}
                    onPageChange={props.onPageChange}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    containerClassName={s.pagination}
                    pageLinkClassName={s.page_num}
                    previousLinkClassName={s.page_num}
                    nextLinkClassName={s.page_num}
                    activeLinkClassName={s.active}

            /> */}
                { 
                props.users.map( (u, index) => <div key={index} className={s.content}>
                        <span>
                            <div>
                                <img src={u.photos.small != null ? u.photos.small : user} className={s.photoUrl} alt=""/>
                            </div>
                            <div>
                                { u.followed ? <button onClick={ () => {props.unfollow(u.id)}}>Unfollow</button>
                                : <button onClick={ () => {props.follow(u.id)}}>Follow</button>}
                            </div>
                        </span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{'u.location.country'}</div>
                            <div>{'u.location.city'}</div>
                        </span>
                    </div>)
                }
            </div>
}

export default Users;