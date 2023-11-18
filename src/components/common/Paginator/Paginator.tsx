import React, {useState} from "react"
import s from './Paginator.module.css'
import cn from 'classnames'

type PropsType = {
    totalItemsCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    portionSize?: number
}

const Paginator: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
        let pages: Array<number> = []
        for (let i=1; i <= pagesCount; i++) {
            pages.push(i);
        }

        let portionCount = Math.ceil(pagesCount / portionSize)
        let [portionNumber, setPortionNumber] = useState(1)
        // let [portionNumber, setPortionNumber] = useState<number | null>(null)
        // if (portionNumber === null) portionNumber =1
        let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
        let rightPortionPageNumber = portionNumber * portionSize


    return <>
                <div>
                    <div className={s.pagination}>
                        {
                            portionNumber > 1 && <button className={s.btn} onClick={() => {setPortionNumber(portionNumber - 1)} }>ТУДА</button>
                        }
                        { pages
                        .filter(p => p>= leftPortionPageNumber && p<= rightPortionPageNumber)
                        .map( p => {
                            return <span className={ cn ({
                                [s.selectedPage]: currentPage === p}, s.pageNumber)}
                                    key={p}
                                    onClick={ (e) => {onPageChanged(p)}}>{p}</span>
                        })}
                        {portionCount > portionNumber && 
                        <button  className={s.btn} onClick={() => {setPortionNumber(portionNumber + 1)}}>СЮДА</button>}
                    </div>
                    </div>
                </>
            }  


export default Paginator ;