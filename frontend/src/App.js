import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Playlist from "./components/Playlist";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/playlist/:userId" element={<Playlist />} />
    </Routes>
  );
}

export default App;
