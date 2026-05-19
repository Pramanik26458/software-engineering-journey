const mongoose =require("mongoose")

const userSchema=new mongoose.Schema(
    {
        username:{
        type:String,
        unique:[true,"This username alredy exist" ],
        required:[true,"Username is required"]
        }
,
        email:{
            type:String,
            unique:[true,"This email alredy exist" ],
            required:[true,"Email is required"]
        },
        password:{
            type:String,
            required:[true,"password is required"]

        },
        bio:String,
        profileImage:{
            type:String,
            default:"https://ik.imagekit.io/devCodex/avatar-default-user-profile-icon-simple-flat-grey-vector-57234191.webp"
        }
    }
)


const userModel=mongoose.model("user",userSchema)

module.exports=userModel 