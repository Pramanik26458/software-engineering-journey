const express =require("express")
const cookieParser = require("cookie-parser")
const cors =require('cors');

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}))

/**
 * require routes
 */
const authRouter=require("./route/auth.routes")
const postRouter=require("./route/post.routes")
const userRouter=require("./route/user.routes")
/**
 *uusing routes
 */
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)
app.use('/api/users',userRouter)



module.exports=app;