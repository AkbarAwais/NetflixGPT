import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSuggestions = () => {
    const movie = useSelector((store) => store.searchMovie?.gptMovies);
    if (!movie) return;
    console.log(movie);

    return (
        <div className='text-white absolute top-96 md:top-64 px-0'>
            <MovieList title={"Search Results"} movies={movie} />
        </div>
    )
}

export default GptMovieSuggestions
