import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

const IMG = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "—";

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden relative">
      <Link to={`/pelicula/${movie.id}`}>
        {movie.poster_path ? (
          <img
            src={IMG + movie.poster_path}
            alt={movie.title}
            className="w-full aspect-[2/3] object-cover"
          />
        ) : (
          <div className="w-full aspect-[2/3] bg-gray-700 flex items-center justify-center text-gray-400">
            Sin póster
          </div>
        )}
      </Link>
      <div className="absolute top-2 right-2 bg-black/60 rounded-full px-2">
        <FavoriteButton movie={movie} />
      </div>
      <div className="p-3">
        <h2 className="font-bold text-sm">{movie.title}</h2>
        <p className="text-xs text-gray-400">{year}</p>
      </div>
    </div>
  );
}

export default MovieCard;