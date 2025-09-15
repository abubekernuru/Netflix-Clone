
const API_KEY = process.env.REACT_APP_API_KEY;

// https://api.themoviedb.org/3/trending/all/week?api_key=27140497fb0afc069980adf94987a15b&language=en-US

// Base URL for movie images
export const imageBaseUrl = 'https://image.tmdb.org/t/p/original';

export const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

// Function to search movies
export const searchMovies = (query) => {
  return `/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
};

