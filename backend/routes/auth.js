import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../store.js";

const router = express.Router();
const JWT_SECRET = "supersecretkey"; // Use env var in production

// Register new user
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  if (users.find(u => u.username === username))
    return res.status(400).json({ error: "Username already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ id: users.length + 1, username, password: hashedPassword, role: role || "officer" });
  res.json({ message: "User registered" });
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "8h" });
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

export default router;
