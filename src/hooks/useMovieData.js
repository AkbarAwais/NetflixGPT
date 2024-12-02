import { useDispatch } from "react-redux";
import { API_OPTIONS, GET_MOVIE_LIST, MAIN_VIDEO_URL, POPULAR_MOVIE_LIST, TOP_RATED_LIST, UPCOMMING_MOVIE_LIST } from "../utils/constants";
import { addNowPlayingMovies, addPopularMovies, addTopRatedMovies, addUpcommingMovies } from "../utils/movieSlice";
import { useEffect } from "react";


const useMoviewData = () => {

    const dispatch = useDispatch();
    const fetchMovieData = async () => {
        try {
            const [nowPlaying, popular, topRated, upcoming] = await Promise.all([
                fetch(GET_MOVIE_LIST, API_OPTIONS),
                fetch(POPULAR_MOVIE_LIST, API_OPTIONS),
                fetch(TOP_RATED_LIST, API_OPTIONS),
                fetch(UPCOMMING_MOVIE_LIST, API_OPTIONS)
            ]);

            const [nowPlayingJson, popularJson, topRatedJson, upcomingJson] = await Promise.all([
                nowPlaying.json(),
                popular.json(),
                topRated.json(),
                upcoming.json()
            ]);

            // Fetch trailers for each movie
            const moviesWithTrailers = await Promise.all([
                ...nowPlayingJson.results,
                ...popularJson.results,
                ...topRatedJson.results,
                ...upcomingJson.results
            ].map(async (movie) => {
                try {
                    const videoResponse = await fetch(MAIN_VIDEO_URL(movie.id), API_OPTIONS);
                    const videoJson = await videoResponse.json();
                    const trailer = videoJson.results?.find(item => item.type === "Trailer") || videoJson.results[0];

                    return {
                        ...movie,
                        trailerKey: trailer ? trailer.key : null
                    };
                } catch (error) {
                    console.error(`Failed to fetch trailer for movie ${movie.id}:`, error);
                    return movie;
                }
            }));

            // Separate movies by category
            const nowPlayingMovies = moviesWithTrailers.filter(movie =>
                nowPlayingJson.results.some(m => m.id === movie.id)
            );
            const popularMovies = moviesWithTrailers.filter(movie =>
                popularJson.results.some(m => m.id === movie.id)
            );
            const topRatedMovies = moviesWithTrailers.filter(movie =>
                topRatedJson.results.some(m => m.id === movie.id)
            );
            const upcomingMovies = moviesWithTrailers.filter(movie =>
                upcomingJson.results.some(m => m.id === movie.id)
            );

            // Dispatch actions with movies including trailer keys
            dispatch(addNowPlayingMovies(nowPlayingMovies));
            dispatch(addPopularMovies(popularMovies));
            dispatch(addTopRatedMovies(topRatedMovies));
            dispatch(addUpcommingMovies(upcomingMovies));

        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    };
    useEffect(() => {
        fetchMovieData();
    }, [])
}

export default useMoviewData;
