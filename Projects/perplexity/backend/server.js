import dotenv from "dotenv";
import http from "http";
import app from "./src/app.js"; 
import connectDB from "./src/config/database.js"; 
import { initSocket } from "./src/socket/server.socket.js";
dotenv.config();

const PORT = process.env.PORT || 3000;
const httpServer = http.createServer(app);

// Initialize Socket Server
initSocket(httpServer);

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log("✓ Database connected successfully");

    httpServer.listen(PORT, () => {
      console.log(`✓ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("✗ Failed to start server:", error.message);
    process.exit(1);
  }
};

// testAi();
startServer();