import { useParams } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();
  return <h1 className="text-2xl">Detalle de la película {id}</h1>;
}

export default MovieDetail;