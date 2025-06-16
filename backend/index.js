import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import authRouter from "./routes/auth.js";
import { authenticateToken } from "./middleware/auth.js";
import { users, units, calls } from "./store.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

// Auth routes
app.use("/api/auth", authRouter);

// Protected routes example
app.get("/api/units", authenticateToken, (req, res) => {
  res.json(units);
});

// Real-time connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("unitStatusUpdate", (data) => {
    // Update unit status in memory
    const unit = units.find(u => u.id === data.id);
    if (unit) unit.status = data.status;
    // Broadcast to all clients
    io.emit("unitStatus", units);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
