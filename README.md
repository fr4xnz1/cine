# CineGrupo

Proyecto educativo hecho con React para el curso de Desarrollo Web FullStack. Permite ver películas populares, filtrarlas por género, buscarlas, ver su detalle y guardar favoritas.

## Tecnologías

- React + Vite
- Tailwind CSS
- React Router
- Axios
- Node.js + Express (servidor intermedio para ocultar la API key)
- API de TMDB
- Publicado en Render

## Cómo correr el proyecto

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/fr4xnz1/cine.git
   cd cine
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Crear un archivo `.env` junto a `package.json` con la dirección del servidor:
   ```
   VITE_API_URL=https://TU-SERVIDOR.onrender.com/api
   ```
4. Iniciar el proyecto:
   ```bash
   npm run dev
   ```

La primera carga puede tardar un minuto, porque el servidor gratuito se duerme cuando no se usa.

## Cómo funciona la API key

La clave de TMDB no está en el código del frontend. Vive solo en el servidor (carpeta `server/`), que recibe las peticiones de la app y se las pasa a TMDB.

## Trabajo en equipo

- No trabajar directamente en `main`.
- Cada uno crea su rama: `git checkout -b nombre-de-la-tarea`.
- Antes de empezar: `git pull`.
- Al terminar: subir la rama y abrir un pull request.
- Nunca subir archivos `.env`.

## Integrantes

- Franz Aldair Rojas Ramirez
- (buscador)
- (login y menú)
- (géneros y diseño)

Datos de películas proporcionados por [TMDB](https://www.themoviedb.org/). Este producto usa la API de TMDB pero no está avalado ni certificado por TMDB.
