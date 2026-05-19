const express = require("express");
const authController=require("../controller/auth.controller")

const authRouter = express.Router();
const {
   registerController,
   loginController
} = require("../controller/auth.controller");

authRouter.post("/register", registerController);

authRouter.post("/login", loginController);

module.exports = authRouter;
