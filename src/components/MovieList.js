import React from 'react'
import MovieCardView from './MovieCardView';
import { useSelector } from 'react-redux';
import Shimmer from './Shimmer';

const MovieList = ({ title, movies }) => {
    const isShimmerUI = useSelector((store) => store.movies?.isShimmer);
    return (
        <div className=''>
            <h1 className='text-2xl font-extrabold py-5 ml-2 md:ml-20 md:space-y-0 space-y-4 p-2 md:p-0'>{title}</h1>
            <div className='w-full sm:px-8 pl-2 md:ml-10 overflow-x-scroll relative group-hover:overflow-hidden scrollbar-hide overflow-y-hidden hover:scrollbar-custom scroll-smooth space-y-4 p-4 '>
                <div className='inline-flex transition-shadow'>
                    {isShimmerUI && <>
                        <Shimmer />
                        <Shimmer />
                        <Shimmer />
                    </>}
                    {!isShimmerUI && movies.map((movie, index) => <MovieCardView key={movie.id + index} image={movie?.poster_path} title={movie.original_title} movieId={movie.id} video={movie.trailerKey} />)}
                </div>
            </div>
        </div>

    )
}

export default MovieList
