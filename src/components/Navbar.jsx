import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function Navbar() {
  const { favorites } = useFavorites();

  return (
    <nav className="bg-gray-800 px-6 py-4 flex gap-6 items-center">
      <Link to="/" className="text-xl font-bold text-red-500">
        CineXD
      </Link>
      <Link to="/favoritos" className="hover:text-red-400">
        Favoritos ({favorites.length})
      </Link>
    </nav>
  );
}

export default Navbar;