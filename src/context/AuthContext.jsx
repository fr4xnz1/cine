import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(localStorage.getItem("usuario") || "");
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const logueado = Boolean(usuario && token);

  function iniciarSesion(nombre) {
    const nombreLimpio = nombre.trim();
    const tokenFalso = "token-falso-" + Date.now();

    localStorage.setItem("usuario", nombreLimpio);
    localStorage.setItem("token", tokenFalso);

    setUsuario(nombreLimpio);
    setToken(tokenFalso);
  }

  function cerrarSesion() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");

    setUsuario("");
    setToken("");
  }

  return (
    <AuthContext.Provider
      value={{ usuario, token, logueado, iniciarSesion, cerrarSesion }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}