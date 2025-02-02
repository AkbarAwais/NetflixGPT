import React from 'react';
import { useDispatch } from 'react-redux';
import { FULL_SCREEN_TRAILER_URL } from '../utils/constants';
import { addMovieToView } from '../utils/movieSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const VideoTitle = ({ title, overview, trailerKey }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const url = FULL_SCREEN_TRAILER_URL(trailerKey);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className='absolute w-3/4 md:w-full text-white bg-gradient-to-r px-10 md:px-20 pt-2 md:pt-72'
        >
            <motion.h1
                className='text-lg md:text-5xl font-extrabold inline-block transition-all duration-300 ease-in-out hover:text-gray-300'
                whileHover={{ scale: 1.05 }}
            >
                {title}
            </motion.h1>

            <motion.p
                className='hidden md:block md:text-2xl md:w-1/3 text-justify text-white overflow-hidden mt-4'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                {overview}
            </motion.p>

            <motion.button
                className='mt-5 px-4 py-2 text-lg md:text-2xl font-bold border-2 border-white text-white bg-white bg-opacity-0 rounded-lg backdrop-blur-md hover:bg-opacity-80 hover:text-black transition-all duration-300 ease-in-out'
                onClick={() => {
                    dispatch(addMovieToView(url));
                    navigate('/playVideo');
                }}
                whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(255,255,255,0.8)" }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                ▶ Play
            </motion.button>
        </motion.div>
    );
};

export default VideoTitle;
