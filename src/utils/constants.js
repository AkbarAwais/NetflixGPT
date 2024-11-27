export const NETFLIX_BG = "https://assets.nflxext.com/ffe/siteui/vlv3/4690cab8-243a-4552-baef-1fb415632f74/web/IN-en-20241118-TRIFECTA-perspective_0b813abc-8365-4a43-a9d8-14c06e84c9f3_small.jpg";
export const GET_MOVIE_LIST = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
export const MAIN_VIDEO_URL = (movieId) => `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
export const MAIN_TRAILER_URL = (trailerId) => `https://www.youtube.com/embed/${trailerId}?&autoplay=1&mute=1&modestbranding=1&controls=0&loop=1`;

export const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjQyOTllMDZlYTQ4ZTNmOGM4MDQ2OWM3NTRiM2MyNyIsIm5iZiI6MTczMjcyODY4Ni4xMzkwMzUyLCJzdWIiOiI2NzQ3NTFmYjc5NTg0N2U5OTM1NDYyMzIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.C5DKpL7dbyX0UGXZKqC1DGLXoT5AOrleQGC5TAZQdg8'
    }
};
