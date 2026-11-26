import { useFavorites } from "../context/FavoritesContext";

function FavoriteButton({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(movie.id);

  return (
    <button
      onClick={() => toggleFavorite(movie)}
      className="text-xl"
      aria-label={active ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      {active ? "❤️" : "🤍"}
    </button>
  );
}

export default FavoriteButton;