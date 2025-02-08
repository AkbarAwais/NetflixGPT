import React, { useRef, useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import client from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import Notification from './Notification';
import { addSearchMovies, toggleShimmerEffect } from '../utils/gptMovieSlice';

const GptSearchBar = () => {
    const searchRef = useRef(null);
    const [search, setSearch] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const dispatch = useDispatch();

    const fetchMovie = async (movieList) => {
        const moviesPromises = movieList.map((movie) =>
            fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, API_OPTIONS)
        );

        try {
            const movieResponses = await Promise.all(moviesPromises);
            const finalMovieList = await Promise.all(
                movieResponses.map(response => response.json())
            );
            dispatch(addSearchMovies(finalMovieList.map(item => item.results[0])));
            dispatch(toggleShimmerEffect(false));
        } catch (error) {
            setNotification({ type: 'error', message: 'Error fetching trailers. Please try again.' });
        }
    };

    const handleButtonClick = async () => {
        setIsLoading(true);
        dispatch(toggleShimmerEffect(true));

        if (!searchRef.current.value) {
            setSearch(false);
            setIsLoading(false);
            return;
        }
        setSearch(true);

        const GPTQuery = "Act as a Trailer Recommendation system and suggest some trailers for the query "
            + searchRef.current.value
            + ". and only give some 7 movie names that also have data mentioned in the TMDB site, in comma separated eg: Smile, Hera Pheri, Golmal,Don,Gadar";

        try {
            const chatCompletion = await client.chat.completions.create({
                messages: [{ role: 'user', content: GPTQuery }],
                model: 'anthropic/claude-3.5-haiku-20241022:beta'
            });

            if (chatCompletion.hasOwnProperty('error') || chatCompletion.choices[0]?.message.content === '') {
                throw new Error('Server error');
            }

            if (!chatCompletion?.choices[0]) {
                throw new Error('No response from server');
            }

            const movieList = chatCompletion?.choices[0]?.message?.content.split(',');
            await fetchMovie(movieList);
        } catch (error) {
            setNotification({ type: 'error', message: 'Error fetching trailers. Please try again.' });
            dispatch(toggleShimmerEffect(false));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {notification && (
                <Notification
                    type={notification.type}
                    message={notification.message}
                />
            )}

            <div className="min-h-[30vh] flex pt-40 items-center justify-center px-4 sm:px-6">
                <div className="w-full max-w-2xl bg-black/60 rounded-2xl p-8 shadow-2xl border border-white/10">
                    <div className="space-y-6">
                        <div className="relative">
                            <input
                                ref={searchRef}
                                placeholder="What would you like to watch today?"
                                id="search"
                                autoComplete="off"
                                required
                                className={`w-full h-14 px-6 rounded-xl bg-white/10
                                         border-2 transition-all duration-300 ease-in-out
                                         text-white placeholder:text-white/50
                                         focus:outline-none focus:ring-2 focus:ring-cyan-500
                                         ${!search ? 'border-red-500' : 'border-white/20 pl-2'}`}
                            />
                            <Search className="absolute right-4 top-4 text-white/50" size={24} />
                        </div>

                        {!search && (
                            <p className="text-red-500 text-sm font-medium animate-pulse">
                                Please enter something to search
                            </p>
                        )}

                        <button
                            onClick={handleButtonClick}
                            disabled={isLoading}
                            className={`w-full py-4 rounded-xl font-medium text-white
                                    transition-all duration-300 ease-in-out
                                    ${isLoading
                                    ? 'bg-cyan-600/50 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600'
                                } shadow-lg hover:shadow-cyan-500/25`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <Loader2 className="animate-spin" size={20} />
                                    <span>Searching...</span>
                                </div>
                            ) : (
                                'Search Trailers'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GptSearchBar;
