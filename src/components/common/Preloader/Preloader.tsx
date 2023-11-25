import React, { FC } from "react"
import preloader from '../../../images/preloader2.svg'
import s from './Preloader.module.css'

type PropsType = {
    isFetching: boolean
}

const Preloader: FC<PropsType> = (props) => {
    return (
        <header className={s.preloader}>
            { props.isFetching ? <img src={preloader} alt="preloader"/> : null}
        </header>
    )
    }

export default Preloader