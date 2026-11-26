import axios from "axios";
import type {
  Movie, MovieDetails, Genre, CastMember, Video, Paginated,
} from "../types/movie";

const proxyUrl: string | undefined = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: proxyUrl || "https://api.themoviedb.org/3",
  params: proxyUrl
    ? { language: "es-ES" }
    : { api_key: import.meta.env.VITE_TMDB_KEY, language: "es-ES" },
});

export const getPopular = (page: number = 1) =>
  api.get<Paginated<Movie>>("/movie/popular", { params: { page } });

export const searchMovies = (query: string, page: number = 1) =>
  api.get<Paginated<Movie>>("/search/movie", { params: { query, page } });

export const getMovie = (id: string) => api.get<MovieDetails>(`/movie/${id}`);

export const getGenres = () => api.get<{ genres: Genre[] }>("/genre/movie/list");

export const getByGenre = (genreId: number, page: number = 1) =>
  api.get<Paginated<Movie>>("/discover/movie", {
    params: { with_genres: genreId, page },
  });

export const getCredits = (id: string) =>
  api.get<{ cast: CastMember[] }>(`/movie/${id}/credits`);

export const getVideos = (id: string) =>
  api.get<{ results: Video[] }>(`/movie/${id}/videos`, {
    params: { language: "en-US" },
  });