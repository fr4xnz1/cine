import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { iniciarSesion, logueado, usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim();
    const correoValido =
      correoLimpio.includes("@") &&
      correoLimpio.includes(".") &&
      !correoLimpio.includes(" ");

    if (!nombreLimpio) {
      setError("Escribe tu nombre");
      return;
    }

    if (!correoValido) {
      setError("Ingresa un correo válido");
      return;
    }

    if (clave.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setError("");
    iniciarSesion(nombreLimpio);
    navigate("/");
  }

  if (logueado) {
    return (
      <div className="p-6">
        <p className="mb-4">Hola {usuario}</p>
        <button
          type="button"
          onClick={cerrarSesion}
          className="px-4 py-2 bg-red-600 rounded hover:bg-red-500 cursor-pointer"
        >
          Salir
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Iniciar sesión</h1>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700"
        />

        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700"
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-red-600 rounded hover:bg-red-500 cursor-pointer"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;