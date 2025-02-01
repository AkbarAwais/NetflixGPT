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
    }, [movie]); // Added dependency array to trigger effect on 'movie' change

    const fetchGptMovies = async () => {
        try {
            const promises = movie?.filter(item => item).map(item => fetch(MAIN_VIDEO_URL(item?.id), API_OPTIONS));
            const jsonData = await Promise.all(promises);
            const finalData = await Promise.all(jsonData.map(item => item.json()));

            const filteredResults = finalData.map(item => item.results.filter(item2 => item2.type === "Trailer")[0]);

            // Create a new object for each movie and add the trailerKey
            const final = movie.map((item, index) => ({
                ...item, // Copy all properties of the movie
                trailerKey: filteredResults[index]?.key, // Add trailerKey
            }));

            setSearchList(final);
        } catch (error) {
            console.error('Error fetching movie trailers:', error);
            <Notification type={'error'} message={'Server error'} />
        }
    };
    if(!movie) return;
    return (
        <div className='text-white absolute w-full top-96 flex overflow-x-scroll md:overflow-x-auto md:top-64 px-0'>
            <MovieList title={"Search Results"} movies={searchList} />
        </div>
    );
};

export default GptMovieSuggestions;
