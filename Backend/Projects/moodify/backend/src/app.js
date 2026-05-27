const cors = require("cors");

const express = require("express");

const cookieParser =
  require("cookie-parser");

// ================= APP =================

const app = express();

// ================= MIDDLEWARE =================

app.use(
  cors({
    origin: "http://localhost:5173",

    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

// ================= ROUTES =================

const authRoutes =
  require("./routes/auth.routes");

app.use(
  "/api/auth",
  authRoutes
);

module.exports = app;