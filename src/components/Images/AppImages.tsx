import React, {useState, useEffect, FC} from "react"
import Images from "./Images"

const AppImages: FC = () => {
    const [images, setImages] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/photos').then(
            response => response.json().then(data => {
                setImages(data)
            })
        )
    }, [])
    return (
        <div>
            <Images data={ images }/>
        </div>
    )
}

export default AppImages