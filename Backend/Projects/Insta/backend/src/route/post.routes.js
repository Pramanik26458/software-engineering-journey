const express = require("express");
const postRouter = express.Router();
const PostController = require("../controller/post.controller");
const multer = require("multer");
const identifyUser = require("../middlewares/auth.middleware");
const upload = multer({ storage: multer.memoryStorage() });

/**
 * POST /api/posts [protected-this api ill be acess by only who have the token ]
 * req.body={caption,image_url}
 *
 *
 */

postRouter.post(
  "/",
  upload.single("media"),
  identifyUser,
  PostController.createPostController,
);

/**
 *GET/api/post/

 */

postRouter.get("/", identifyUser, PostController.getPostConteoller);

/*
 *Get/api/posts/details/:postId
 -retur an details about a specific post with the id,
  also check wheather the post belong to the user that the request come from  
*/

postRouter.get(
  "/details/:postId",
  identifyUser,
  PostController.getPostDetailsController,
);

/**
 * @route POST /api/posts/like/:postid
 * @description like a post with
 *
 */

postRouter.post(
  "/like/:postId",
  identifyUser,
  PostController.likePostController,
);

/**
 * @route POST /api/dislike/:postId
 * @description dislike a post
 * 
 */

postRouter.post(
  "/dislike/:postId",
  identifyUser,
  PostController.PostDislikeController,
);

module.exports = postRouter;
