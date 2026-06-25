import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import chatRouter from './routes/chat.route.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
  // "*" ke badle apna specific domain likho
  origin: "https://software-engineering-journey.vercel.app", 
  credentials: true, // Ye true rehna chahiye
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/chats', chatRouter);

export default app;