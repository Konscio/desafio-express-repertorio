const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/canciones", (req, res) => {
  const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));

  res.json(canciones);
});

app.post("/canciones", (req, res) => {
  const nuevaCancion = req.body;

  const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));

  canciones.push(nuevaCancion);

  fs.writeFileSync("repertorio.json", JSON.stringify(canciones, null, 2));

  res.send("Canción agregada");
});

app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;

  const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));

  const cancionesActualizadas = canciones.filter((cancion) => cancion.id != id);

  fs.writeFileSync(
    "repertorio.json",
    JSON.stringify(cancionesActualizadas, null, 2),
  );

  res.send("Canción eliminada");
});

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;

  const datosActualizados = req.body;

  const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));

  const cancionesActualizadas = canciones.map((cancion) => {
    if (cancion.id == id) {
      return datosActualizados;
    }

    return cancion;
  });

  fs.writeFileSync(
    "repertorio.json",
    JSON.stringify(cancionesActualizadas, null, 2),
  );

  res.send("Canción actualizada");
});

app.listen(3000, () => {
  console.log("Servidor funcionando en puerto 3000");
});
