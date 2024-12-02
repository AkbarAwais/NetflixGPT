import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PlayTrailerInFullScreen = () => {
    const navigate = useNavigate();
    const movieToView = useSelector((store) => store.movies?.movieView);

    // Navigate back if no movie is selected
    useEffect(() => {
        if (!movieToView) {
            navigate('/browse');
        }
    }, [movieToView, navigate]); // Dependency array ensures this runs when movieToView changes

    // Render iframe only if movieToView exists
    if (!movieToView) {
        return null; // Optionally show a loader or message
    }

    return (
        <div>
            {/* Fullscreen iframe */}
            <iframe
                className="w-screen h-screen rounded-lg shadow-lg object-contain"
                src={movieToView}
                title="YouTube video player"
                allow="accelerometer; autoplay;"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
        </div>
    );
};

export default PlayTrailerInFullScreen;
