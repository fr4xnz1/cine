import { useEffect, useState } from "react";
import { getPopular } from "../services/tmdb";
import FavoriteButton from "../components/FavoriteButton";

function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getPopular()
      .then((res) => setMovies(res.data.results))
      .catch(() => setError(true));
  }, []);

  if (error) return <p>Error al cargar las películas</p>;

  return (
    <div>
      <h1 className="text-2xl mb-4">Películas populares</h1>
      <ul>
        {movies.map((m) => (
          <li key={m.id} className="flex gap-2 items-center">
            {m.title} <FavoriteButton movie={m} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;