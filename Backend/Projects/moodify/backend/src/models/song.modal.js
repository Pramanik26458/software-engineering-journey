const mongoose=require ("mongoose")


const songSchema=mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    posterUrl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    mood:{
        type: String,

    enum: {
        values: ["sad", "happy", "romantic", "surprise"],

        message: "{VALUE} is not supported mood"
    },

    }
})


const songModel=mongoose.model("songs",songSchema)

module.exports=songModel;