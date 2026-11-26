import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1 className="text-2xl mb-2">Página no encontrada</h1>
      <Link to="/" className="text-red-400 hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;