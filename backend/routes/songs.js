const express = require("express");
const Song = require("../models/Song");
const router = express.Router();

// Obtener canciones del usuario
router.get("/:userId", async (req, res) => {
  const songs = await Song.find({ userId: req.params.userId });
  res.json(songs);
});

// Agregar canción
router.post("/", async (req, res) => {
  const song = new Song(req.body);
  await song.save();
  res.json(song);
});

// Editar canción
router.put("/:id", async (req, res) => {
  await Song.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Canción actualizada" });
});

// Eliminar canción
router.delete("/:id", async (req, res) => {
  await Song.findByIdAndDelete(req.params.id);
  res.json({ message: "Canción eliminada" });
});

module.exports = router;
