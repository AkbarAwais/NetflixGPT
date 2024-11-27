import { useDispatch } from "react-redux";
import { API_OPTIONS, GET_MOVIE_LIST } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";


const useMoviewData = () => {
    const dispatch = useDispatch();
    const fetchMovieData = async () => {
        const data = await fetch(GET_MOVIE_LIST, API_OPTIONS);
        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results));
    };
    useEffect(() => {
        fetchMovieData();
    }, [])
}

export default useMoviewData;
