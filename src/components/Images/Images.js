import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import s from './Images.module.css';


 export default function Images(props) {
    const {data} = props;
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 6;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, data])


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;

        setItemOffset(newOffset);
    };

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel="сюда >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                previousLabel="< туда"
                renderOnZeroPageCount={null}
                containerClassName={s.pagination}
                pageLinkClassName={s.page_num}
                previousLinkClassName={s.page_num}
                nextLinkClassName={s.page_num}
                activeLinkClassName={s.active}

            />
            <div className={s.images}>
                {currentItems.map(image => {
                    return (
                        <div className={s.image}>
                            <img src={image.url} alt={image.title}/>
                        </div>
                    );
                    
                })}
            </div>
        </>
    );
}
