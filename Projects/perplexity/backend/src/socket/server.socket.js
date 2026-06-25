import { Server } from "socket.io";

let io;

export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: [
        "http://localhost:5173",
        process.env.FRONTEND_URL,
      ],
      credentials: true,
      methods: ["GET", "POST"],
    },
  });

  console.log("✓ Socket.IO server is running");

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