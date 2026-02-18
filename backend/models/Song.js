const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  title: String,
  artist: String,
  userId: String
});

module.exports = mongoose.model("Song", SongSchema);
