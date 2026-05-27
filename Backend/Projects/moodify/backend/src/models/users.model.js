const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is Required"],
        unique:[true,"Username mustt be unique"],
    },
    email:{
        type:String,
        required:[true,"email is Required"],
        unique:[true,"email mustt be unique"],
    },
    password:{
        type:String,
        required:[true,"password is required"]

    }

})

// userSchema.pre("save",function(next){})
// userSchema.post("save",function(next){})


const userModel=mongoose.model("users",userSchema);

module.exports=userModel;