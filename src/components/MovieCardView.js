import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { IMAGE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addMovieToView } from '../utils/movieSlice';
import { useNavigate } from 'react-router-dom';

const MovieCardView = ({ title, image, video }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [iframeSrc, setIframeSrc] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleMouseEnter = () => {
        setIsHovered(true);
        setIframeSrc(`https://www.youtube.com/embed/${video}?autoplay=1&controls=1&mute=0&modestbranding=1&controls=0&loop=1&rel=0&playlist=${video}&vq=hd1080`);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setIframeSrc(''); // Clear the `src` to stop the video
    };
    
    return (
        <div
            className="relative w-48 group px-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Base Movie Poster */}
            <div className="w-full h-72 overflow-hidden rounded-lg">
                <img
                    src={IMAGE_URL(image)}
                    alt={'Image not available'}
                    className={`
                        w-full
                        h-full
                        object-cover
                        transition-all
                        duration-300
                        ease-in-out
                        ${isHovered ? 'scale-110' : 'scale-100'}
                    `}
                />
            </div>

            {/* Expanded Hover Card */}
            <div
                className={`
                    absolute
                    top-0
                    left-0
                    w-full
                    bg-neutral-900
                    rounded-lg
                    shadow-2xl
                    z-50
                    overflow-hidden
                    transition-all
                    duration-300
                    ease-in-out
                    ${isHovered
                        ? 'opacity-100 scale-125 translate-y-0'
                        : 'opacity-0 scale-100 -translate-y-4 pointer-events-none'}
                `}
            >
                {/* Hover Image */}
                <div className="relative w-full h-48 overflow-hidden">
                    {iframeSrc && (
                        <iframe
                            className="w-full h-full rounded-lg shadow-lg object-contain"
                            src={iframeSrc}
                            title="YouTube video player"
                            allow="accelerometer; autoplay;"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen>
                        </iframe>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-100 flex items-center justify-center h-14">
                        <div className="text-white w-full h-12 hover:scale-110 transition" />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-100 flex items-center justify-center h-14 top-36">
                        <div className="text-white w-full h-12 hover:scale-110 transition" />
                    </div>
                </div>

                {/* Card Details */}
                <div className="p-3">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex space-x-2">
                            <button className="p-1 bg-white rounded-full hover:bg-gray-500 ease-in-out duration-300" onClick={() => {
                                dispatch(addMovieToView(iframeSrc));
                                navigate('/playVideo')
                            }}>
                                <Play className="w-5 h-5" fill="gray" />
                            </button>
                        </div>
                    </div>
                    <h3 className="text-white font-bold text-sm">{title}</h3>
                </div>
            </div>
        </div>
    );
};

export default MovieCardView;
