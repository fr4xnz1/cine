import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: { api_key: import.meta.env.VITE_TMDB_KEY, language: "es-ES" },
});

export const getPopular = () => api.get("/movie/popular");
export const searchMovies = (query) => api.get("/search/movie", { params: { query } });
export const getMovie = (id) => api.get(`/movie/${id}`);