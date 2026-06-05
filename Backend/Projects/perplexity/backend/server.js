import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import {testAi} from "./src/service/ai.service.js";
import http from "http";
import { initSocket } from "./src/socket/server.socket.js";


const PORT = process.env.PORT || 3000;

const httpServer=http.createServer(app);
initSocket(httpServer)
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

testAi();
startServer();