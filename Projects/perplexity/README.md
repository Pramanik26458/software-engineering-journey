<div align="center">

# 🔍 Perplexity AI Clone

### A full-stack AI-powered search and chat assistant built with the MERN stack

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-black?style=for-the-badge&logo=vercel)](https://perplexity-ai-chat.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/Pramanik26458/software-engineering-journey)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=flat&logo=redux&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=flat&logo=socket.io&logoColor=white)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [AI Models](#-ai-models)
- [Authentication Flow](#-authentication-flow)
- [API Reference](#-api-reference)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Author](#-author)

---

## 🌟 Overview

This is a **production-grade Perplexity AI clone** built as a major placement project by a 4th-year Computer Science Engineering student. It replicates the core experience of Perplexity AI — an intelligent assistant that combines large language models with real-time web search to deliver accurate, cited, up-to-date answers.

The application supports multiple AI providers, real-time web search via Tavily, persistent chat history, full authentication with email verification, and a polished dark/light mode UI that works across all screen sizes.

---

## 🚀 Live Demo

| Platform | URL |
|----------|-----|
| **Frontend** | [perplexity-ai-chat.vercel.app](https://perplexity-ai-chat.vercel.app) |
| **Backend API** | Deployed on Render |

> **Note:** The backend is on Render's free tier. The first request after inactivity may take ~30 seconds to wake up.

---

## ✨ Features

### 🔐 Authentication
- User registration with email & password
- Email verification via tokenized link (JWT-based)
- Secure login with HTTP-only cookie sessions
- Protected routes — unverified users cannot access the dashboard
- Logout with complete session cleanup
- Persistent authentication across page refreshes

### 🤖 AI Chat
- Multi-turn conversations with full context history
- Automatic chat title generation using AI
- Multiple AI model support with automatic fallback chain
- Markdown rendering — headings, bullet points, bold, italic, tables
- Syntax-highlighted code blocks
- Message like/dislike feedback
- Copy response to clipboard
- Auto-scroll to latest message

### 🔍 Real-Time Web Search
- Powered by **Tavily Search API**
- Automatically detects when a query needs live data
- Triggers on keywords: news, today, latest, price, weather, cricket, IPL, Bitcoin, who is, etc.
- Returns cited sources with inline references [1], [2]
- Falls back gracefully if search fails

### 💬 Chat Management
- Persistent chat history stored in MongoDB
- Sidebar with all previous conversations
- Click any chat to load full message history
- Delete individual chats with confirmation dialog
- New chat starts fresh with a blank canvas

### 🎨 UI / UX
- Dark mode and light mode with smooth transition
- Fully responsive — mobile, tablet, desktop
- Mobile sidebar slides in as an overlay drawer
- Suggestion chips on empty dashboard
- Professional loading states
- Real-time socket connection indicator
- Animated typing indicator while AI generates

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js v5** | Web framework and REST API |
| **MongoDB + Mongoose** | Database and ODM |
| **Socket.IO** | Real-time WebSocket communication |
| **JSON Web Tokens (JWT)** | Authentication and email verification tokens |
| **bcryptjs** | Password hashing |
| **Nodemailer** | Transactional email sending |
| **LangChain** | AI model orchestration and chaining |
| **Tavily** | Real-time web search API |
| **express-validator** | Input validation and sanitization |
| **Morgan** | HTTP request logging |
| **cookie-parser** | Cookie parsing middleware |
| **CORS** | Cross-origin resource sharing |

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 19** | UI library |
| **Vite 7** | Build tool and dev server |
| **Redux Toolkit** | Global state management |
| **React Router v7** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **Socket.IO Client** | WebSocket client |
| **react-markdown** | Markdown rendering in chat |
| **remark-gfm** | GitHub Flavoured Markdown support |
| **Framer Motion** | Animations |
| **GSAP** | Advanced animations |
| **Tailwind CSS v4** | Utility-first CSS framework |

### AI Providers (Free Tier)
| Provider | Models Used |
|----------|------------|
| **Google Gemini** | gemini-2.0-flash, gemini-1.5-flash, gemini-1.5-pro |
| **OpenRouter** | meta-llama/llama-3.3-70b-instruct:free, google/gemma-3-27b-it:free |

### Infrastructure
| Service | Purpose |
|---------|---------|
| **MongoDB Atlas** | Cloud database (free 512MB tier) |
| **Render** | Backend hosting (free tier) |
| **Vercel** | Frontend hosting (free tier) |
| **Tavily** | Web search (1000 req/month free) |
| **Google AI Studio** | Gemini API key (free) |

---

## 📁 Project Structure

```
perplexity/
├── backend/
│   ├── server.js                    # Entry point — HTTP + Socket.IO server
│   ├── package.json
│   └── src/
│       ├── app.js                   # Express app — middleware, CORS, routes
│       ├── config/
│       │   └── database.js          # MongoDB Atlas connection
│       ├── controllers/
│       │   ├── auth.controller.js   # Register, login, logout, verify, getMe
│       │   └── chat.controller.js   # Send message, get chats, get messages, delete, feedback
│       ├── middlewares/
│       │   └── auth.middleware.js   # JWT cookie verification
│       ├── models/
│       │   ├── user.model.js        # User schema (username, email, password, verified)
│       │   ├── chat.model.js        # Chat schema (user ref, title, timestamps)
│       │   └── message.model.js     # Message schema (chat ref, content, role)
│       ├── routes/
│       │   ├── auth.routes.js       # /api/auth/* routes
│       │   └── chat.route.js        # /api/chats/* routes
│       ├── service/
│       │   ├── ai.service.js        # LangChain AI orchestration + Tavily search
│       │   ├── mail.service.js      # Nodemailer email sending
│       │   └── internet.service.js  # Web search helper
│       ├── socket/
│       │   └── server.socket.js     # Socket.IO initialization and event handlers
│       └── validators/
│           └── auth.validator.js    # express-validator rules for auth routes
│
└── frontend/
    ├── index.html                   # Entry HTML with favicon
    ├── vite.config.js               # Vite configuration
    ├── vercel.json                  # Vercel SPA rewrite rules
    ├── package.json
    └── src/
        ├── main.jsx                 # React entry point
        ├── app/
        │   ├── App.jsx              # Root component — loads user on mount
        │   ├── App.routes.jsx       # All route definitions
        │   ├── app.store.js         # Redux store configuration
        │   └── index.css            # Global styles
        └── features/
            ├── auth/
            │   ├── auth.slice.js          # Redux slice — user, loading, error state
            │   ├── hook/useAuth.js        # Auth actions hook
            │   ├── service/auth.api.js    # Axios calls to /api/auth
            │   ├── components/
            │   │   └── Protected.jsx      # Route guard component
            │   └── pages/
            │       ├── Login.jsx          # Login page
            │       └── Register.jsx       # Registration page
            ├── chat/
            │   ├── chat.slice.js          # Redux slice — chats, messages, loading
            │   ├── hooks/useChat.js       # Chat actions hook
            │   ├── service/
            │   │   ├── chat.api.js        # Axios calls to /api/chats
            │   │   └── chat.soket.js      # Socket.IO client connection
            │   └── pages/
            │       └── Dashboard.jsx      # Main chat interface (sidebar + chat)
            └── theme/
                └── theme.slice.js         # Redux slice — dark/light mode
```

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (Vercel)                       │
│                                                             │
│   React 19 + Redux Toolkit + React Router v7                │
│   ┌──────────┐  ┌──────────┐  ┌─────────────────────────┐  │
│   │  Login   │  │ Register │  │       Dashboard          │  │
│   │  Page    │  │  Page    │  │  Sidebar  │  Chat Area   │  │
│   └──────────┘  └──────────┘  └─────────────────────────┘  │
│         │              │                    │               │
│    Axios (REST)    Axios (REST)     Axios + Socket.IO       │
└─────────┼──────────────┼────────────────────┼───────────────┘
          │              │                    │
          ▼              ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                     SERVER (Render)                          │
│                                                             │
│   Express.js v5  +  Socket.IO                               │
│   ┌──────────────────┐  ┌──────────────────────────────┐   │
│   │   Auth Routes    │  │        Chat Routes            │   │
│   │  /api/auth/*     │  │       /api/chats/*            │   │
│   └──────────────────┘  └──────────────────────────────┘   │
│         │                          │                        │
│   JWT Middleware             Auth Middleware                 │
│         │                          │                        │
│   ┌─────▼──────┐         ┌────────▼────────┐              │
│   │   Auth     │         │  Chat           │               │
│   │ Controller │         │  Controller     │               │
│   └────────────┘         └────────┬────────┘              │
│                                   │                         │
│                          ┌────────▼────────┐               │
│                          │   AI Service    │               │
│                          │  (LangChain)    │               │
│                          └────────┬────────┘               │
└───────────────────────────────────┼─────────────────────────┘
                                    │
           ┌────────────────────────┼────────────────────────┐
           │                        │                        │
           ▼                        ▼                        ▼
   ┌──────────────┐     ┌──────────────────┐     ┌─────────────────┐
   │  MongoDB     │     │  Google Gemini   │     │  Tavily Search  │
   │  Atlas       │     │  OpenRouter      │     │  (Web Search)   │
   │  (Database)  │     │  (AI Models)     │     │  (Live Data)    │
   └──────────────┘     └──────────────────┘     └─────────────────┘
```

---

## 🤖 AI Models

The application uses a **fallback chain** — if one model fails or hits a rate limit, it automatically tries the next one:

```
1st → Gemini 2.0 Flash    (fastest, 15 req/min, 1M tokens/day — FREE)
2nd → Gemini 1.5 Flash    (fallback, same limits — FREE)
3rd → Gemini 1.5 Pro      (more powerful — FREE)
4th → LLaMA 3.3 70B       (via OpenRouter — FREE)
5th → Gemma 3 27B         (via OpenRouter — FREE)
```

### How Web Search Works

The AI service automatically decides if a query needs real-time data:

```javascript
// Triggers web search when query contains:
'today', 'news', 'latest', 'current', 'now', 'price',
'bitcoin', 'weather', 'cricket', 'ipl', 'score',
'prime minister', 'president', 'who is', 'trending' ...

// If triggered:
Query → Tavily Search → Top 4 results with sources
      → Injected into system prompt
      → AI answers with citations [1][2][3]
```

---

## 🔐 Authentication Flow

```
REGISTRATION
────────────
User fills form → POST /api/auth/register
→ Password hashed with bcryptjs
→ User saved to MongoDB (verified: false)
→ JWT token generated (30 day expiry)
→ Verification email sent with link:
  {BACKEND_URL}/api/auth/verify-email?token={jwt}
→ User sees "Check your email" message

EMAIL VERIFICATION
──────────────────
User clicks email link → GET /api/auth/verify-email?token=...
→ JWT decoded → user found in DB
→ user.verified = true saved
→ Beautiful success HTML page shown
→ Auto-redirects to login after 4 seconds

LOGIN
─────
User submits credentials → POST /api/auth/login
→ Email found in DB? No → 400 error
→ Password matches bcrypt hash? No → 400 error
→ Email verified? No → 403 error (with clear message)
→ All pass → JWT cookie set (7 day expiry, httpOnly)
→ User data returned → Redux state updated
→ Redirect to /dashboard

SESSION PERSISTENCE
───────────────────
Every app load → GET /api/auth/get-me
→ JWT cookie sent automatically
→ Server verifies → returns user data
→ Redux hydrated → user stays logged in

LOGOUT
──────
POST /api/auth/logout → cookie cleared → Redux reset → /login
```

---

## 📡 API Reference

### Auth Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | ❌ | Register new user |
| `GET` | `/api/auth/verify-email?token=` | ❌ | Verify email address |
| `POST` | `/api/auth/login` | ❌ | Login and get session cookie |
| `POST` | `/api/auth/logout` | ❌ | Clear session cookie |
| `GET` | `/api/auth/get-me` | ✅ | Get logged-in user profile |

### Chat Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/api/chats/message` | ✅ | Send message (creates new chat if no chatId) |
| `GET` | `/api/chats` | ✅ | Get all chats for current user |
| `GET` | `/api/chats/:chatId/messages` | ✅ | Get all messages in a chat |
| `DELETE` | `/api/chats/delete/:chatId` | ✅ | Delete a chat and all its messages |
| `POST` | `/api/chats/message/:messageId/feedback` | ✅ | Like or dislike a message |

### Request / Response Examples

**Register**
```json
POST /api/auth/register
{
  "username": "pramanik",
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response 201:
{
  "message": "User registered successfully. Please check your email.",
  "success": true,
  "user": { "id": "...", "username": "pramanik", "email": "...", "verified": false }
}
```

**Send Message**
```json
POST /api/chats/message
{
  "message": "What is the latest news in AI?",
  "chat": "64f1a2b3c4d5e6f7a8b9c0d1"   // optional, omit for new chat
}

Response 201:
{
  "chat": { "_id": "...", "title": "Latest AI News", "user": "..." },
  "aiMessage": { "_id": "...", "content": "## Latest AI News\n...", "role": "ai" },
  "title": "Latest AI News"
}
```

---

## 🔑 Environment Variables

### Backend `.env`

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/perplexity

# Authentication
JWT_SECRET=your_super_secret_jwt_key_minimum_32_chars

# URLs (update for production)
BACKEND_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173

# Email (Gmail OAuth2)
GOOGLE_USER=youremail@gmail.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_google_refresh_token

# Alternative: Gmail App Password (simpler)
# GMAIL_APP_PASSWORD=your_16_char_app_password

# AI Services
GEMINI_API_KEY=your_gemini_api_key        # aistudio.google.com (FREE)
OPENROUTER_API_KEY=your_openrouter_key    # openrouter.ai (FREE)
TAVILY_API_KEY=your_tavily_key            # tavily.com (1000/month FREE)
```

### Frontend `.env`

```env
VITE_API_URL=http://localhost:3000
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- MongoDB Atlas account (free)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Pramanik26458/software-engineering-journey.git
cd software-engineering-journey/Projects/perplexity
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder and fill in all variables from the [Environment Variables](#-environment-variables) section above.

```bash
# Start development server
npm run dev
```

Backend will start at `http://localhost:3000`

You should see:
```
✓ Socket.IO server initialized
✅ Email service ready
MongoDB Connected: your-cluster-name
✓ Database connected successfully
✓ Server is running on port 3000
✓ AI pool (all free): Gemini 2.0 Flash → Gemini 1.5 Flash → ...
```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` folder:

```env
VITE_API_URL=http://localhost:3000
```

```bash
# Start development server
npm run dev
```

Frontend will start at `http://localhost:5173`

### 4. Open in Browser

Visit `http://localhost:5173` and:
1. Register an account
2. Check your email and click the verification link
3. Log in
4. Start chatting with the AI

---

## ☁️ Deployment

### Deploy Backend to Render

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repository
4. Configure:

```
Root Directory:  backend
Runtime:         Node
Build Command:   npm install
Start Command:   node server.js
```

5. Add all environment variables from the backend `.env` section
6. Set `NODE_ENV=production`
7. Deploy and copy your Render URL

### Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repository
3. Configure:

```
Root Directory:    frontend
Framework Preset:  Vite
Build Command:     npm run build
Output Directory:  dist
```

4. Add environment variable:
```
VITE_API_URL = https://your-render-url.onrender.com
```

5. Deploy and copy your Vercel URL

### Final Step — Update CORS

Go back to Render → Environment → update:
```
FRONTEND_URL = https://your-app.vercel.app
BACKEND_URL  = https://your-render-url.onrender.com
```

Save and redeploy. Your app is now live.

### Deployment Checklist

- [ ] `MONGODB_URI` set and Atlas IP whitelist includes `0.0.0.0/0`
- [ ] `JWT_SECRET` set to a strong random string
- [ ] `BACKEND_URL` set to actual Render URL (not localhost)
- [ ] `FRONTEND_URL` set to actual Vercel URL (not localhost)
- [ ] `VITE_API_URL` set in Vercel environment variables
- [ ] `NODE_ENV=production` set on Render
- [ ] Gmail credentials or App Password configured
- [ ] Gemini API key configured
- [ ] Tavily API key configured
- [ ] Frontend redeployed after adding `VITE_API_URL`
- [ ] Backend redeployed after adding `FRONTEND_URL`

---

## 🗂 Database Schema

### User
```javascript
{
  username:  String  // unique, required
  email:     String  // unique, required
  password:  String  // bcrypt hashed
  verified:  Boolean // false until email verified
  createdAt: Date
  updatedAt: Date
}
```

### Chat
```javascript
{
  user:      ObjectId  // ref: User
  title:     String    // AI-generated from first message
  createdAt: Date
  updatedAt: Date
}
```

### Message
```javascript
{
  chat:      ObjectId  // ref: Chat
  content:   String    // message text (Markdown for AI messages)
  role:      String    // 'user' | 'ai'
  createdAt: Date
  updatedAt: Date
}
```

---

## 🔒 Security Features

- Passwords hashed using **bcryptjs** (salt rounds: 10)
- Sessions stored in **HTTP-only cookies** (not accessible via JavaScript)
- **JWT** used for both session tokens and email verification tokens
- Cookie set to `secure: true` and `sameSite: none` in production
- Email verification required before dashboard access
- All chat routes protected by auth middleware
- Users can only access their own chats (MongoDB query includes `user: req.user.id`)
- CORS configured to allow only your specific frontend domain
- Input validation using **express-validator** on all auth routes

---

## 🤝 Contributing

This is a personal placement project. If you'd like to suggest improvements:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Basak Pramanik**
4th Year Computer Science Engineering Student

[![GitHub](https://img.shields.io/badge/GitHub-Pramanik26458-black?style=flat&logo=github)](https://github.com/Pramanik26458)

---

<div align="center">

**⭐ If you found this project helpful, please give it a star!**

Built with ❤️ as a major placement project

</div>