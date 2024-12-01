import React from 'react'
import useTrailer from '../hooks/useTrailer'
import { useSelector } from 'react-redux';
import { MAIN_TRAILER_URL } from '../utils/constants';

const VideoBackground = ({ movieId }) => {
    useTrailer(movieId);
    const trailer = useSelector((store) => store?.movies?.trailer);
    if (!trailer) return;
    const trailerUrl = MAIN_TRAILER_URL(trailer.key)
    return (
        <div className=''>
            <iframe
                className='w-screen aspect-video rounded-lg shadow-lg '
                src={trailerUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen>
            </iframe>
        </div>
    )
}

export default VideoBackground
