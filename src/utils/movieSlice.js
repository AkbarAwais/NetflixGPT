import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        nowPlayingMovies: null,
        popularMovies: null,
        topRatedMovies: null,
        upcommingMovies: null,
        trailer: null,
        movieView: null
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        addUpcommingMovies: (state, action) => {
            state.upcommingMovies = action.payload;
        },
        addTrailer: (state, action) => {
            state.trailer = action.payload;
        },
        addMovieToView: (state, action) => {
            state.movieView = action.payload;
        }
    }
});


export const { addNowPlayingMovies, addTrailer, addPopularMovies, addTopRatedMovies, addUpcommingMovies, addMovieToView } = movieSlice.actions;
export default movieSlice.reducer;
