const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    caption: {
        type: String,
        default: ""
    },

    image_url: {
        type: String,
        required: true
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }

}, {
    timestamps: true
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;