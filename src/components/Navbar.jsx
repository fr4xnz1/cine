import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { favorites } = useFavorites();
  const { logueado, usuario, cerrarSesion } = useAuth();

  return (
    <nav className="bg-gray-800 px-6 py-4 flex gap-6 items-center">
      <Link to="/" className="text-xl font-bold text-red-500">
        CineGrupo
      </Link>
      <Link to="/buscar" className="hover:text-red-400">
        Buscar
      </Link>
      <Link to="/favoritos" className="hover:text-red-400">
        Favoritos ({favorites.length})
      </Link>

      {logueado ? (
        <div className="ml-auto flex gap-4 items-center">
          <span>Hola {usuario}</span>
          <button
            type="button"
            onClick={cerrarSesion}
            className="hover:text-red-400 cursor-pointer"
          >
            Salir
          </button>
        </div>
      ) : (
        <Link to="/login" className="ml-auto hover:text-red-400">
          Iniciar sesión
        </Link>
      )}
    </nav>
  );
}

export default Navbar;