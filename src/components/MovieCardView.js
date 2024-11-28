import React from 'react'
import { IMAGE_URL } from '../utils/constants'

const MovieCardView = ({ title, movieId, image }) => {
    return (
        <img className='pr-2 mx-2 rounded-xl hover:scale-[1.1] ease-in-out duration-300' src={IMAGE_URL(image)} alt='' />
    )
}

export default MovieCardView
