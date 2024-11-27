import { useEffect } from "react";
import { API_OPTIONS, MAIN_VIDEO_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailer } from "../utils/movieSlice";

const useTrailer = (movieId) => {
    const dispatch = useDispatch();
    const fetchTrailer = async () => {
        const data = await fetch(MAIN_VIDEO_URL(movieId), API_OPTIONS);
        const json = await data.json();
        const trailer = json.results?.find(item => item.type === "Trailer")
        dispatch(addTrailer(trailer ? trailer : json.results[0]));
    }
    useEffect(() => {
        fetchTrailer();
    }, []);
}
export default useTrailer;
