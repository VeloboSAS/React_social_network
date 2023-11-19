import React, {useState, FC} from "react"
import s from './Count.module.scss'

type PropsType = {
}

const News: FC<PropsType>  = (props) => {
    const [count, setCount] = useState(0)

    const onClickPlus = () => {
        setCount(count + 1)
    }

    const onClickMinus = () => {
        setCount(count - 1)
    }

    return (
        <div className={s.App}>
          <div>
            <h2>Счетчик:</h2>
            <h1>{count}</h1>
            <button onClick={onClickMinus} className={s.minus}>- Минус</button>
            <button onClick={onClickPlus} className={s.plus}>Плюс +</button>
          </div>
        </div>
      )}

export default News;