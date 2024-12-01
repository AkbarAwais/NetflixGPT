import React from 'react'
import { useSelector } from 'react-redux'
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';

const MainContainer = () => {
    const movies = useSelector((store) => store.movies?.nowPlayingMovies);
    if (!movies) return;
    const mainMovie = movies[Math.floor(Math.random() * movies.length)];
    const { original_title, overview } = mainMovie
    return (
        <div className=''>
            <VideoTitle title={original_title} overview={overview} />
            <VideoBackground movieId={mainMovie.id} />
        </div>
    )
}

export default MainContainer
