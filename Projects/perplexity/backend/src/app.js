import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import authRouter from './routes/auth.routes.js';
import chatRouter from './routes/chat.route.js';

const app = express();

// 1. Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// 2. CORS 
app.use(cors({
  origin: "https://software-engineering-journey.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use('/api/auth', authRouter);
app.use('/api/chats', chatRouter);

app.get('/', (req, res) => {
    res.send("Backend is running properly!");
});

export default app;