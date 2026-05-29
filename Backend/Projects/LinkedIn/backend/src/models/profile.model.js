import mongoose from "mongoose"

const eductionSchema=new mongoose.Schema({
    school:{
        type:String,
        default:"",
    },
    degree:{    
        type:String,
        default:"",
    },
    fieldOfStudy:{
        type:String,
        default:"",
    },
    startDate:{
        type:Date,
        default:Date.now,
    },
    endDate:{
        type:Date,
        default:Date.now,
    },
    grade:{
        type:String,
        default:"",
    },
    description:{
        type:String,
        default:"",
    },
})

const workSchema=new mongoose.Schema({
    company:{
        type:String,
        default:"",
    },
    position:{
        type:String,
        default:"",
    },
    years:{
        type:Number,
        default:0,
    },
    startDate:{
        type:Date,
        default:Date.now,
    },
    endDate:{
        type:Date,
        default:Date.now,
    },
    description:{
        type:String,
        default:"",
    },
})

const profileSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    headline:{    
        type:String,
        default:"",
    },
    bio:{   
        type:String,
        default:"",
    },
    location:{
        type:String,
        default:"",
    },  
    education:[eductionSchema],
    workExperience:[workSchema],
    skills:{
        type:[String],
        default:[],
    },
    socialLinks:{
        type:Map,
        of:String,
        default:{},
    }
})

const Profile=mongoose.model("Profile",profileSchema)

export default Profile