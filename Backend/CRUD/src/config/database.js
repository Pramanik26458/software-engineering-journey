const mongoose = require('mongoose')

function connectToDatabase(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{ 
        console.log('conntected to the  database')
    })
    
}

module.exports = connectToDatabase;