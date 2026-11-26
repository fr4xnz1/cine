import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pelicula/:id" element={<MovieDetail />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/buscar" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="text-center text-xs text-gray-500 py-6">
        Datos de películas proporcionados por TMDB. Este producto usa la API de TMDB pero no está avalado ni certificado por TMDB.
      </footer>
    </div>
  );
}

export default App;