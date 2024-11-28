import React, { useRef } from 'react'
import { IMAGE_URL } from '../utils/constants'

const MovieCardView = ({ title, movieId, image }) => {
    const ref = useRef(null);
    return (
        <img ref={ref} className='pr-2 mx-2 rounded-xl hover:scale-[.95] transition-all ease-in-out duration-500 cursor-pointer' src={IMAGE_URL(image)} alt='' />
    )
}

export default MovieCardView
