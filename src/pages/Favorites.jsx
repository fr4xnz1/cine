import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return <p>Aún no tienes películas favoritas.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl mb-4">Mis favoritas</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {favorites.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;