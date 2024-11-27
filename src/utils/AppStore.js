import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import movieSlice from "./movieSlice"


const AppStore = configureStore({
    reducer: {
        user: userSlice,
        movies: movieSlice
    }
});

export default AppStore;
