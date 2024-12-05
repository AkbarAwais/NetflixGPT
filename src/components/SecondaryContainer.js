import React from 'react'
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
    const nowPlayingMovies = useSelector((store) => store.movies?.nowPlayingMovies);
    const popularMovies = useSelector((store) => store.movies?.popularMovies);
    const topRatedMovies = useSelector((store) => store.movies?.topRatedMovies);
    const upcommingMovies = useSelector((store) => store.movies?.upcommingMovies);

    return (
        <div className='bg-black md:bg-transparent text-white relative md:-mt-72 z-10 top-[200px] sm:top-[500px] sm:right-14 md:top-0'>
            {nowPlayingMovies && <MovieList title={"Now Playing"} movies={nowPlayingMovies} />}
            {popularMovies && <MovieList title={"Popular"} movies={popularMovies} />}
            {topRatedMovies && <MovieList title={"Top Rated"} movies={topRatedMovies} />}
            {upcommingMovies && <MovieList title={"Upcomming"} movies={upcommingMovies} />}
        </div>
    )
}

export default SecondaryContainer
