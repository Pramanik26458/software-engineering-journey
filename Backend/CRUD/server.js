// to start the server 
//  and connect the database

const mongoose=require('mongoose')
const connectToDatabase=require('./src/config/database')
const app=require('./src/app')
require('dotenv').config()





connectToDatabase();

app.listen(3000,()=>{  
    console.log('server is running on port 3000')
})  