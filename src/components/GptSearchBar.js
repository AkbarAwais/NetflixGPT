import React, { useRef, useState } from 'react'
import client from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addSearchMovies } from '../utils/gptMovieSlice';

const GptSearchBar = () => {
    const searchRef = useRef(null);
    const [search, setSearch] = useState(true);
    const dispatch = useDispatch();
    const fetchMovie = async (movieList) => {
        const moviesPromises = movieList.map((movie) =>
            fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, API_OPTIONS)
        );

        try {
            // Await all fetch requests and convert to JSON in one step
            const movieResponses = await Promise.all(moviesPromises);

            // Parse JSON from each response and collect the results
            const finalMovieList = await Promise.all(
                movieResponses.map(response => response.json())
            );

            // Dispatch movies to Redux store
            dispatch(addSearchMovies(finalMovieList.map(item => item.results[0])));
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    const handleButtonClick = async () => {
        if (!searchRef.current.value) {
            setSearch(false);
            return;
        }
        setSearch(true);

        const GPTQuery = "Act as a Movie Recommendation system and suggest some movies for the query"
            + searchRef.current.value
            + ". and only give me names of 7 movies, in comma seperated eg: Smile, Hera Pheri, Golmal,Don,Gadar";
        const chatCompletion = await client.chat.completions.create({
            messages: [{ role: 'user', content: GPTQuery }],
            model: 'o1-mini'
        }).catch((error) => {
            console.log(error);

        });
        if (!chatCompletion?.choices[0]) {
            return;
        }
        const movieList = chatCompletion?.choices[0]?.message?.content.split(',');
        fetchMovie(movieList)



    }
    return (
        <div className=''>
            <div className='bg-opacity-80 text-white flex justify-center items-center relative top-32 md:top-2'>
                <div className='relative top-24 border-2 pl-5 pr-5 pt-4 pb-4 rounded-xl bg-gray-950 bg-opacity-50 border-cyan-600 box-content grid-cols-4 m-4 md:m-2 md:p-4'>
                    <div className='inline-block text-center'>
                        <input ref={searchRef} placeholder='What would you like to watch today?' id="search" autoComplete='off' required
                            className={"h-10 w-80 rounded-lg bg-white bg-opacity-75 border-3 col-span-3 border-black placeholder:text-black placeholder:text-center font-bold mb-2 ease-in-out duration-200 placeholder:font-bold placeholder:text-opacity-30 text-black p-2 " + (!search ? 'outline-none outline-red-500' : '')} />
                        {!search && <h3 className='text-red-500 font-bold cursor-default focus:outline'>Enter Movie</h3>}
                    </div>
                    <button htmlFor='search' className={'md:mx-4 mx-20 col-span-3 my-2 px-2 py-1 rounded-lg hover:ease-in-out hover:duration-200 bg-red-700 hover:bg-red-900 font-bold border-2 text-lg mb-1 relative top-0 ' + (!search ? 'bottom-10 md:-top-10' : 'bottom-0')} onClick={handleButtonClick}>Search Movies</button>
                </div>
            </div>
        </div>
    )
}

export default GptSearchBar
