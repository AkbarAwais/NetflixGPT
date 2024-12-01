export const NETFLIX_BG = "https://assets.nflxext.com/ffe/siteui/vlv3/4690cab8-243a-4552-baef-1fb415632f74/web/IN-en-20241118-TRIFECTA-perspective_0b813abc-8365-4a43-a9d8-14c06e84c9f3_small.jpg";
export const GET_MOVIE_LIST = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
export const MAIN_VIDEO_URL = (movieId) => `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
export const MAIN_TRAILER_URL = (trailerId) => `https://www.youtube.com/embed/${trailerId}?&autoplay=1&mute=1&modestbranding=1&controls=0&loop=1&rel=0&playlist=${trailerId}`;
export const IMAGE_URL = (movieId) => "https://image.tmdb.org/t/p/w200/" + movieId;

export const POPULAR_MOVIE_LIST = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=2';
export const TOP_RATED_LIST = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=2';
export const UPCOMMING_MOVIE_LIST = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY
export const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.REACT_APP_TMDB_KEY
    }
};
