import { createSlice } from "@reduxjs/toolkit";

const gptMovieSlice = createSlice({
    name: 'movieSearch',
    initialState: {
        gptMovies: null,
        isShimmer : false
    },
    reducers: {
        addSearchMovies: (state, action) => {
            state.gptMovies = action.payload
        },
        toggleShimmerEffect: (state,action)=>{
            state.isShimmer = action.payload;
        }
    }
});

export const { addSearchMovies,toggleShimmerEffect } = gptMovieSlice.actions;

export default gptMovieSlice.reducer;
