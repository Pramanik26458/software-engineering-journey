import {Router} from "express"
import { activeCheck, commentPost, createPost, deleteComment, getCommentsByPost, togglePostLike } from "../controllers/post.controller.js"
import multer, { diskStorage } from "multer"
import auth from "../middlewares/auth.middleware.js"
import { getAllPosts, deletePost } from "../controllers/post.controller.js";

const router=Router()
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)

    }
})

const  upload=multer({storage:storage})

router.route("/").get(activeCheck)
router.route("/post").post(auth, upload.single("media"), createPost);
router.route("/posts").get(getAllPosts);
router.route("/delete_post/:id").delete(auth, deletePost);
router.route("/comment_post").post(auth, commentPost);
router.route("/comments/:post_id").get(getCommentsByPost); 
router.route("/comment/:commentId").delete(auth, deleteComment);
router.route("/like/:id").post(auth, togglePostLike);

export default router;
