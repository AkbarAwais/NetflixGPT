import React from 'react'
import { useDispatch } from 'react-redux'
import { FULL_SCREEN_TRAILER_URL } from '../utils/constants';
import { addMovieToView } from '../utils/movieSlice';
import { useNavigate } from 'react-router-dom';

const VideoTitle = ({ title, overview, trailerKey }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const url = FULL_SCREEN_TRAILER_URL(trailerKey);
    return (
        <div className='h-[300px] w-3/4 md:h-screen text-ellipsis md:w-full aspect-video pt-2 md:pt-72 md:px-20 whitespace-wrap px-10 absolute bg-gradient-to-r from-black cursor-default'>
            <h1 className='text-lg md:text-5xl font-extrabold text-white inline hover:text-gray-300 transition-all ease-in-out duration-300 ml-4 relative md:top-0 top-10'>{title}</h1>
            <div className='hidden md:block md:text-2xl md:w-1/3 md:p-4 md:text-justify text-white md:flex-wrap text-ellipsis md:h-auto h-[100px] md:whitespace-normal overflow-hidden'>{overview}</div>
            <button className='ml-6 m-5 md:text-2xl bg-white border-white bg-opacity-100 text-black rounded-lg px-8 py-2 mr-5 hover:bg-gray-400
            hover:text-black transition-all duration-300 ease-in-out relative md:top-0 top-10 right-2' onClick={() => {
                    dispatch(addMovieToView(url));
                    navigate('/playVideo')
                }}>
                Play</button>
        </div>
    )
}

export default VideoTitle
