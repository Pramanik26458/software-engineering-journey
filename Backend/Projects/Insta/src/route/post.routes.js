const express=require("express")
const postRouter=express.Router();
const PostController=require("../controller/post.controller")
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage() })

/**
 * POST /api/posts [protected-this api ill be acess by only who have the token ]
 * req.body={caption,image_url}
 * 
 * 
 */


postRouter.post("/",upload.single("media"),PostController.createPostController)

module.exports=postRouter;