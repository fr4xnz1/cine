import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const BASE = "https://api.themoviedb.org/3";

app.use("/api", async (req, res) => {
  if (!/^\/(movie|search\/movie|genre\/movie\/list|discover\/movie)/.test(req.path)) {
    return res.status(404).json({ error: "No permitido" });
  }
  try {
    const url = new URL(BASE + req.path);
    for (const [k, v] of Object.entries(req.query)) url.searchParams.set(k, v);
    url.searchParams.set("api_key", process.env.TMDB_KEY);
    const r = await fetch(url);
    res.status(r.status).json(await r.json());
  } catch {
    res.status(500).json({ error: "Error en el servidor" });
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor listo en http://localhost:${PORT}/api/movie/popular`));