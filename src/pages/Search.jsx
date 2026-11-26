import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMovies } from '../services/tmdb'
import MovieCard from '../components/MovieCard'

function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [busqueda, setBusqueda] = useState(searchParams.get('q') || '')
  const [peliculas, setPeliculas] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(false)
  const query = searchParams.get('q') || ''

  useEffect(() => {
    if (!query) {
     setPeliculas([])
      setCargando(false)
      setError(false)
    return
    }

    let activo = true

    setCargando(true)
    setError(false)
    setPeliculas([])

    searchMovies(query)
      .then((respuesta) => {
        if (activo) {
          setPeliculas(respuesta.data.results)
          
        }
      })
      .catch(() => {
        if (activo) setError(true)
      })
      .finally(() => {
        if (activo) setCargando(false)
      });

    return () => {
      activo = false
    }
}, [query])

    function handleSubmit(e) {
    e.preventDefault()
    setSearchParams({ q: busqueda.trim() })
  }
  return (
    <div>
      <h1 className="text-2xl mb-4">

        Buscar películas
      </h1>

      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe la peli que quieres ver..."
          className="border rounded p-2 w-full"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4"
        >
          Buscar
        </button>
      </form>
      {!query && <p className="mt-4">Escribe algo para buscar</p>}
      {cargando && <p className="mt-4">Cargando...</p>}
      {error && <p className="mt-4 text-red-500">Error al buscar películas</p>}
      {query && !cargando && !error && peliculas.length === 0 && (
       <p className="mt-4">Sin resultados</p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {peliculas.map((pelicula) => (
          <MovieCard key={pelicula.id} movie={pelicula} />
        ))}
      </div>
    </div>
  );
}

export default Search;