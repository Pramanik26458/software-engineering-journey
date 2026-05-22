const express = require("express");
const postRouter = express.Router();
const PostController = require("../controller/post.controller");
const multer = require("multer");
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
  PostController.createPostController,
);

/**
 *GET/api/post/

 */

postRouter.get("/", PostController.getPostConteoller);

/*
 *Get/api/posts/details/:postId
 -retur an details about a specific post with the id,
  also check wheather the post belong to the user that the request come from  
*/

postRouter.get("/details/:postId",PostController.getPostDetailsController)

module.exports = postRouter;
