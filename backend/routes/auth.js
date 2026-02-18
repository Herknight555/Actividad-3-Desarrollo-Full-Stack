const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Registro
router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json({ message: "Usuario registrado" });
});

// Login
router.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) return res.status(401).json({ message: "Credenciales incorrectas" });

  res.json({ userId: user._id });
});

module.exports = router;
