import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";

function Playlist() {
  const { userId } = useParams();
  const [songs, setSongs] = useState([]);
  const [form, setForm] = useState({ title: "", artist: "" });
  const [editingId, setEditingId] = useState(null);

  const loadSongs = async () => {
    const res = await axios.get(
      `http://localhost:3000/songs/${userId}`
    );
    setSongs(res.data);
  };

  useEffect(() => {
    loadSongs();
  }, []);

  const saveSong = async () => {
    if (!form.title || !form.artist) return;

    if (editingId) {
      await axios.put(
        `http://localhost:3000/songs/${editingId}`,
        form
      );
      setEditingId(null);
    } else {
      await axios.post("http://localhost:3000/songs", {
        ...form,
        userId
      });
    }

    setForm({ title: "", artist: "" });
    loadSongs();
  };

  const editSong = song => {
    setForm({ title: song.title, artist: song.artist });
    setEditingId(song._id);
  };

  const deleteSong = async id => {
    await axios.delete(`http://localhost:3000/songs/${id}`);
    loadSongs();
  };

  return (
    <div className="container">
      <h2>Playlist</h2>

      <input
        placeholder="Canción"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />

      <input
        placeholder="Artista"
        value={form.artist}
        onChange={e => setForm({ ...form, artist: e.target.value })}
      />

      <button onClick={saveSong}>
        {editingId ? "Actualizar" : "Agregar"}
      </button>

      <ul>
        {songs.map(song => (
          <li key={song._id}>
            <span>{song.title} - {song.artist}</span>
            <div>
              <button onClick={() => editSong(song)}>Editar</button>
              <button onClick={() => deleteSong(song._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Playlist;
