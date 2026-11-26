import axios from "axios";

const proxyUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: proxyUrl || "https://api.themoviedb.org/3",
  params: proxyUrl
    ? { language: "es-ES" }
    : { api_key: import.meta.env.VITE_TMDB_KEY, language: "es-ES" },
});

export const getPopular = (page = 1) => api.get("/movie/popular", { params: { page } });
export const searchMovies = (query, page = 1) =>
  api.get("/search/movie", { params: { query, page } });
export const getMovie = (id) => api.get(`/movie/${id}`);
export const getGenres = () => api.get("/genre/movie/list");
export const getByGenre = (genreId, page = 1) =>
  api.get("/discover/movie", { params: { with_genres: genreId, page } });
export const getCredits = (id) => api.get(`/movie/${id}/credits`);
export const getVideos = (id) =>
  api.get(`/movie/${id}/videos`, { params: { language: "en-US" } });