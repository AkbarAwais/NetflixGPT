import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';
import { API_OPTIONS, MAIN_VIDEO_URL } from '../utils/constants';
import Notification from './Notification';

const GptMovieSuggestions = () => {
    const movie = useSelector((store) => store.searchMovie?.gptMovies);
    const [searchList, setSearchList] = useState([]);

    useEffect(() => {
        fetchGptMovies();
    }, [movie]);

    const fetchGptMovies = async () => {
        try {
            const promises = movie?.filter(item => item).map(item => fetch(MAIN_VIDEO_URL(item?.id), API_OPTIONS));
            const jsonData = await Promise.all(promises);
            const finalData = await Promise.all(jsonData.map(item => item.json()));

            const filteredResults = finalData.map(item => item.results.filter(item2 => item2.type === "Trailer")[0]);

            // Create a new object for each movie and add the trailerKey
            const final = movie.map((item, index) => ({
                ...item,
                trailerKey: filteredResults[index]?.key,
            }));

            setSearchList(final);
        } catch (error) {
            console.error('Error fetching movie trailers:', error);
            <Notification type={'error'} message={'Server error'} />;
        }
    };

    if (!movie) return null;

    return (
        <div className='text-white absolute w-full sm:top-10 flex overflow-x-scroll md:overflow-x-auto md:top-96 px-4 sm:px-6 lg:px-8 top-96'>
            {/* Adjust layout for smaller screens with proper padding and overflow handling */}
            <MovieList title={"Search Results"} movies={searchList} />
        </div>
    );
};

export default GptMovieSuggestions;
