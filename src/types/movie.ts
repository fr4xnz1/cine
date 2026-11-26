export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
  overview?: string;
}

export interface MovieDetails extends Movie {
  runtime?: number | null;
  tagline?: string;
  genres?: Genre[];
}

export interface CastMember {
  id: number;
  name: string;
  profile_path: string | null;
}

export interface Video {
  key: string;
  site: string;
  type: string;
}

export interface Paginated<T> {
  page: number;
  results: T[];
  total_pages: number;
}