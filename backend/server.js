const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/songs");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/playlistDB")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

app.use("/auth", authRoutes);
app.use("/songs", songRoutes);

// Middleware de errores
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
