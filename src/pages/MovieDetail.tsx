import type { MovieDetails, CastMember, Video } from "../types/movie";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovie, getCredits, getVideos } from "../services/tmdb";
import FavoriteButton from "../components/FavoriteButton";

const IMG = "https://image.tmdb.org/t/p/w500";
const PROFILE = "https://image.tmdb.org/t/p/w185";

function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => 
    {
    if (!id) return;
    setLoading(true);
    setError(false);
    setCast([]);
    setTrailer(null);

    getMovie(id)
      .then((res) => setMovie(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));

    // El reparto y el tráiler son extras: si fallan, la página sigue funcionando
    getCredits(id)
      .then((res) => setCast(res.data.cast.slice(0, 8)))
      .catch(() => {});

    getVideos(id)
      .then((res) => {
        const t = res.data.results.find(
          (v) => v.site === "YouTube" && v.type === "Trailer"
        );
        setTrailer(t || null);
      })
      .catch(() => {});
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

          {cast.length > 0 && (
            <>
              <h2 className="text-xl font-bold mt-6 mb-2">Reparto</h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {cast.map((a) => (
                  <div key={a.id} className="w-24 shrink-0 text-center">
                    {a.profile_path ? (
                      <img
                        src={PROFILE + a.profile_path}
                        alt={a.name}
                        className="w-24 h-32 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-24 h-32 bg-gray-700 rounded-lg" />
                    )}
                    <p className="text-xs mt-1">{a.name}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {trailer && (
            <>
              <h2 className="text-xl font-bold mt-6 mb-2">Tráiler</h2>
              <iframe
                className="w-full aspect-video rounded-lg"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Tráiler"
                allowFullScreen
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;