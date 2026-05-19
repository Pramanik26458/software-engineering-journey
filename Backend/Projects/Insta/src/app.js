const express =require("express")
const cookieParser = require("cookie-parser")
const authRouter=require("./route/auth.routes")
const postRouter=require("./route/post.routes")

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)


module.exports=app;