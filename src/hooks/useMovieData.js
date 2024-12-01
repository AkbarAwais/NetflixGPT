import { useDispatch } from "react-redux";
import { API_OPTIONS, GET_MOVIE_LIST, POPULAR_MOVIE_LIST, TOP_RATED_LIST, UPCOMMING_MOVIE_LIST } from "../utils/constants";
import { addNowPlayingMovies, addPopularMovies, addTopRatedMovies, addUpcommingMovies } from "../utils/movieSlice";
import { useEffect } from "react";


const useMoviewData = () => {

    const dispatch = useDispatch();
    const fetchMovieData = async () => {
        const data = await fetch(GET_MOVIE_LIST, API_OPTIONS);
        const data2 = await fetch(POPULAR_MOVIE_LIST, API_OPTIONS);
        const data3 = await fetch(TOP_RATED_LIST, API_OPTIONS);
        const data4 = await fetch(UPCOMMING_MOVIE_LIST, API_OPTIONS);
        const json = await data.json();
        const json2 = await data2.json();
        const json3 = await data3.json();
        const json4 = await data4.json();
        dispatch(addNowPlayingMovies(json.results));
        dispatch(addPopularMovies(json2.results));
        dispatch(addTopRatedMovies(json3.results));
        dispatch(addUpcommingMovies(json4.results));
    };
    useEffect(() => {
        fetchMovieData();
    }, [])
}

export default useMoviewData;
