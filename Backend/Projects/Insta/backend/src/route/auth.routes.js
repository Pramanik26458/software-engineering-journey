const express = require("express");
const authController=require("../controller/auth.controller")
const identifyUser=require("../middlewares/auth.middleware")
const authRouter = express.Router();


const {
   registerController,
   loginController
} = require("../controller/auth.controller");

authRouter.post("/register", registerController);

authRouter.post("/login", loginController);

/**
 * @route GET /api/auth/get-me
 * @description get the currently logged in user's iinformation
 * @access private
 */

authRouter.get("/get-me",identifyUser,authController.getMeController)

module.exports = authRouter;
