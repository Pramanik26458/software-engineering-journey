require('dotenv').config();
const app=require("./src/app")
const conntectDB=require("./src/config/database");

conntectDB();


app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})

