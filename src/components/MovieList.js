import React from 'react'
import MovieCardView from './MovieCardView';

const MovieList = ({ title, movies }) => {
    return (
        <div className=''>
            <div className='px-10 mx-10 overflow-x-scroll relative group-hover:overflow-hidden scrollbar-hide overflow-y-hidden hover:scrollbar-custom scroll-smooth space-y-4 p-4 '>
                <h1 className='text-2xl font-extrabold py-5 ml-2'>{title}</h1>
                <div className='inline-flex '>
                    {movies.map(movie => <MovieCardView key={movie.id} image={movie.poster_path} title={movie.original_title} movieId={movie.id} />)}
                </div>
            </div>
        </div>

    )
}

export default MovieList
