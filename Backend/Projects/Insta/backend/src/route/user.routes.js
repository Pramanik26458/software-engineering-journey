const express=require("express")
const  userController=require("../controller/user.controller");
const identifyUser = require("../middlewares/auth.middleware");

const userRouter=express.Router()
/**
 * @route POST /api/users/follow/:username
 * @description Send follow request or follow a public account
 * @access Private
 */

userRouter.post(
  "/follow/:username",
  identifyUser,
  userController.followUserController
);

/**
 * @route DELETE /api/users/unfollow/:username
 * @description Unfollow a user or cancel follow request
 * @access Private
 */

userRouter.delete(
  "/unfollow/:username",
  identifyUser,
  userController.unfollowUserController
);

/**
 * @route PATCH /api/users/follow/accept/:username
 * @description Accept follow request
 * @access Private
 */

userRouter.patch(
  "/follow/accept/:username",
  identifyUser,
  userController.acceptFollowRequestController
);

/**
 * @route PATCH /api/users/follow/reject/:username
 * @description Reject follow request
 * @access Private
 */

userRouter.patch(
  "/follow/reject/:username",
  identifyUser,
  userController.rejectFollowRequestController
);



module.exports=userRouter;
  