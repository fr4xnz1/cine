import { useEffect, useState } from "react";
import { getPopular } from "../services/tmdb";
import MovieCard from "../components/MovieCard";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPopular()
      .then((res) => setMovies(res.data.results))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando películas...</p>;
  if (error) return <p>Error al cargar las películas</p>;

  return (
    <div>
      <h1 className="text-2xl mb-4">Películas populares</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}

export default Home;