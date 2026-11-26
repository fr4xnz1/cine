import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovie } from "../services/tmdb";
import FavoriteButton from "../components/FavoriteButton";

const IMG = "https://image.tmdb.org/t/p/w500";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    getMovie(id)
      .then((res) => setMovie(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Cargando...</p>;
  if (error || !movie) return <p>No se pudo cargar la película.</p>;

  const year = movie.release_date ? movie.release_date.slice(0, 4) : "—";

  return (
    <div>
      <Link to="/" className="text-red-400 hover:underline">
        ← Volver
      </Link>

      <div className="mt-4 flex flex-col md:flex-row gap-6">
        {movie.poster_path ? (
          <img
            src={IMG + movie.poster_path}
            alt={movie.title}
            className="w-64 rounded-lg self-start"
          />
        ) : (
          <div className="w-64 aspect-[2/3] bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
            Sin póster
          </div>
        )}

        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            {movie.title} <FavoriteButton movie={movie} />
          </h1>
          {movie.tagline && (
            <p className="italic text-gray-400 mt-1">{movie.tagline}</p>
          )}
          <p className="text-gray-400 mt-2">
            {year}
            {movie.runtime ? ` · ${movie.runtime} min` : ""} · ⭐{" "}
            {movie.vote_average ? movie.vote_average.toFixed(1) : "—"}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {movie.genres?.map((g) => (
              <span key={g.id} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                {g.name}
              </span>
            ))}
          </div>

          <h2 className="text-xl font-bold mt-6 mb-2">Sinopsis</h2>
          <p>{movie.overview || "Sin sinopsis disponible."}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;