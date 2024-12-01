import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import movieSlice from "./movieSlice"
import gptSlice from "./gptSlice"
import gptMovieSlice from "./gptMovieSlice"


const AppStore = configureStore({
    reducer: {
        user: userSlice,
        movies: movieSlice,
        gpt: gptSlice,
        searchMovie: gptMovieSlice
    }
});

export default AppStore;
