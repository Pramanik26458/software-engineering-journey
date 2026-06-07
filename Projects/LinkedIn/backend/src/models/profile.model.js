import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  school:       { type: String, default: "" },
  degree:       { type: String, default: "" },
  fieldOfStudy: { type: String, default: "" },
  startDate:    { type: Date },
  endDate:      { type: Date },
  grade:        { type: String, default: "" },
  description:  { type: String, default: "" },
});

const workSchema = new mongoose.Schema({
  company:     { type: String, default: "" },
  position:    { type: String, default: "" },
  years:       { type: Number, default: 0 },
  startDate:   { type: Date },
  endDate:     { type: Date },
  description: { type: String, default: "" },
});

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,          // One profile per user
    },
    headline:       { type: String, default: "" },
    bio:            { type: String, default: "" },
    location:       { type: String, default: "" },
    education:      { type: [educationSchema], default: [] },
    workExperience: { type: [workSchema], default: [] },
    skills:         { type: [String], default: [] },
    socialLinks:    { type: Map, of: String, default: {} },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;