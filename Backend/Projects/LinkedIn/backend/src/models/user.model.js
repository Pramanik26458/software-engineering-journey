import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    },
    email: {
    type: String,
    required: true,
    unique: true,
    },
    password: {
    type: String,
    required: true,
    },
    username: {
    type: String,
    required: true,
    unique: true,
    },
    profilePicture: {
    type: String,
    default: "default.jpg",
    },
    coverPicture: {
    type: String,
    default: "",
    },
    isAdmin: {
    type: Boolean,
    default: false,
    },
    createdAt: {
    type: Date,
    default: Date.now,
    },
    updatedAt: {
    type: Date,
    default: Date.now,
    },
});

const User = mongoose.model("User", userSchema);

export default User;