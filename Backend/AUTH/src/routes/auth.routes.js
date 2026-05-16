const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/user.model");
// const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

authRouter.post("/register", async (req, res) => {

  const { name, email, password } = req.body;

  const isuserExist = await userModel.findOne({ email });

  if (isuserExist) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  // Hash password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  const User = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: User._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "User registered successfully",
    token,
  });

});
authRouter.get("/get-me", async (req, res) => {
  const token = req.cookies.token;

  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );

  const user = await userModel.findById(decoded.id);

  console.log(user);

  res.status(200).json({
    name: user.name,
    email: user.email,
  });

});

authRouter.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "Login successful",
    token,
  });

});
module.exports = authRouter;
