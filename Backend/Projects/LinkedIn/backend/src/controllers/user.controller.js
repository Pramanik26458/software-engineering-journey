import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import PDFDocument   from "pdfkit";
import fs from "fs";
// import { Stream } from "stream";

const converUserDataToPDF=async(userData)=>{
  const doc=new PDFDocument();
  const outputPath=crypto.randomBytes(16).toString("hex")+".pdf";
  const stream=fs.createWriteStream("/uploads",outputPath);

  doc.pipe(stream); 
  doc.image(userData.userId.profilePicture,{fit:[100,100],align:"center"});
  doc.fontSize(14).text(userData.userId.name,{align:"center"});
  doc.fontSize(12).text(userData.userId.email,{align:"center"});
  doc.fontSize(12).text(userData.userId.username,{align:"center"});
  doc.fontSize(12).text(userData.headline,{align:"center"});
  doc.fontSize(12).text(userData.bio,{align:"center"});
  doc.fontSize(12).text(userData.location,{align:"center"});
  doc.fontSize(12).text("Education:",{align:"left"});
  userData.education.forEach(edu=>{
    doc.fontSize(10).text(`${edu.degree} in ${edu.fieldOfStudy} from ${edu.school} (${edu.startDate} - ${edu.endDate})`,{align:"left"});
    doc.fontSize(10).text(`Grade: ${edu.grade}`,{align:"left"});
    doc.fontSize(10).text(`Description: ${edu.description}`,{align:"left"});
  });
  doc.fontSize(12).text("Work Experience:",{align:"left"});
  userData.workExperience.forEach(work=>{
    doc.fontSize(10).text(`${work.position} at ${work.company} (${work.startDate} - ${work.endDate})`,{align:"left"});
    doc.fontSize(10).text(`Years: ${work.years}`,{align:"left"});
    doc.fontSize(10).text(`Description: ${work.description}`,{align:"left"});
  });

  doc.fontSize(12).text("Skills:",{align:"left"});
  doc.end();

  return outputPath;
}
// ─── Helpers ─────────────────────────────────────────────────────────────────

const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

const attachCookie = (res, token) =>
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day — matches expiresIn
    sameSite: "lax",
  });

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const register = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password || !username) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      return res.status(400).json({ message: "Email or username already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword, username });

    // Create an empty profile document for this user
    await Profile.create({ userId: newUser._id });

    const token = signToken(newUser._id);
    attachCookie(res, token);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (err) {
    console.error("register error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = signToken(user._id);
    attachCookie(res, token);

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ─── User profile ─────────────────────────────────────────────────────────────

export const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePicture: req.file.filename },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Profile picture updated successfully",
      profilePicture: user.profilePicture,
    });
  } catch (err) {
    console.error("uploadProfilePicture error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { name, email, username } = req.body;

    // Check for duplicate email/username belonging to a DIFFERENT user
    if (email || username) {
      const conflict = await User.findOne({
        _id: { $ne: req.user.id },
        $or: [
          ...(email    ? [{ email }]    : []),
          ...(username ? [{ username }] : []),
        ],
      });

      if (conflict) {
        return res.status(400).json({ message: "Email or username already in use" });
      }
    }

    // Only update fields that were actually sent — never use Object.assign on
    // a Mongoose document because it bypasses dirty tracking for some field types.
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          ...(name     !== undefined && { name }),
          ...(email    !== undefined && { email }),
          ...(username !== undefined && { username }),
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        username: updatedUser.username,
        profilePicture: updatedUser.profilePicture,
      },
    });
  } catch (err) {
    console.error("updateUserProfile error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ─── Profile data ─────────────────────────────────────────────────────────────

export const getUserAndProfile = async (req, res) => {
  try {
    const userProfile = await Profile.findOne({ userId: req.user.id }).populate({
      path: "userId",
      select: "name email username profilePicture",
    });

    if (!userProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json({
      message: "User and profile fetched successfully",
      userProfile,
    });
  } catch (err) {
    console.error("getUserAndProfile error:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const updateProfileData = async (req, res) => {
  try {
    // Destructure ONLY the fields we allow to be updated.
    // Everything else in req.body (__v, userId, _id, nested user objects) is ignored.
    const {
      headline,
      bio,
      location,
      education,
      workExperience,
      skills,
      socialLinks,
    } = req.body;

    // Build update object with only fields the client actually sent
    const $set = {};
    if (headline       !== undefined) $set.headline       = headline;
    if (bio            !== undefined) $set.bio            = bio;
    if (location       !== undefined) $set.location       = location;
    if (education      !== undefined) $set.education      = education;
    if (workExperience !== undefined) $set.workExperience = workExperience;
    if (skills         !== undefined) $set.skills         = skills;
    if (socialLinks    !== undefined) $set.socialLinks    = socialLinks;

    if (Object.keys($set).length === 0) {
      return res.status(400).json({ message: "No valid fields provided to update" });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: req.user.id },  // filter by the authenticated user's id from JWT
      { $set },                  // only set the whitelisted fields
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });

  } catch (err) {
    console.error("updateProfileData error:", err);
    return res.status(500).json({ message: err.message });
  }
};


export const getAllUserProfile=async(req,res)=>{
  try{
    const profle=await Profile.find().populate("userId","name email username profilePicture");
    return res.status(200).json({message:"All profile fetched successfully",profle});
  }catch(err){
    return res.status(500).json({ message: err.message });
    
  }
}

export const downloadProfile=async (req,res)=>{
  try{
    const userId=req.params.id;
    const profile=await Profile.findOne({userId}).populate("userId","name email username profilePicture");
    let outputPath =await converUserDataToPDF(profile);
    return res.status(200).json({message:"Profile fetched successfully",outputPath});
  }catch(err){
    return res.status(500).json({ message: err.message });
  }
}