import { Server } from "socket.io";

let io;

export function initSocket(httpServer) {
  const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL
  ].filter(Boolean); 

  io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    },
  });

  console.log("✓ Socket.IO server is running with allowed origins:", allowedOrigins);

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);
    });
  });
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }
  return io;
}