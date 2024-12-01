import { createSlice } from "@reduxjs/toolkit";

const gptMovieSlice = createSlice({
    name: 'movieSearch',
    initialState: {
        gptMovies: null
    },
    reducers: {
        addSearchMovies: (state, action) => {
            state.gptMovies = action.payload
        }
    }
});

export const { addSearchMovies } = gptMovieSlice.actions;

export default gptMovieSlice.reducer;
