import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import crypto from "crypto"; 
import connectionRequest from "../models/connetion.model.js";
import mongoose from 'mongoose';

// ─── PDF Generation Utility ──────────────────────────────────────────────────
const converUserDataToPDF = async (userData) => {
  const doc = new PDFDocument();
  const outputPath = crypto.randomBytes(16).toString("hex") + ".pdf";
  
  const stream = fs.createWriteStream(path.join("./uploads", outputPath));
  doc.pipe(stream);
  
  if (userData.userId?.profilePicture) {
    const imgPath = path.join("./uploads", userData.userId.profilePicture);
    if (fs.existsSync(imgPath)) {
      doc.image(imgPath, { fit: [100, 100], align: "center" });
    }
  }

  doc.fontSize(14).text(userData.userId?.name || "No Name", { align: "center" });
  doc.fontSize(12).text(userData.userId?.email || "", { align: "center" });
  doc.fontSize(12).text(userData.userId?.username || "", { align: "center" });
  doc.fontSize(12).text(userData.headline || "", { align: "center" });
  doc.fontSize(12).text(userData.bio || "", { align: "center" });
  doc.fontSize(12).text(userData.location || "", { align: "center" });
  
  doc.fontSize(12).text("Education:", { align: "left" });
  userData.education?.forEach(edu => {
    doc.fontSize(10).text(`${edu.degree} in ${edu.fieldOfStudy} from ${edu.school} (${edu.startDate} - ${edu.endDate})`, { align: "left" });
    doc.fontSize(10).text(`Grade: ${edu.grade}`, { align: "left" });
    doc.fontSize(10).text(`Description: ${edu.description}`, { align: "left" });
  });

  doc.fontSize(12).text("Work Experience:", { align: "left" });
  userData.workExperience?.forEach(work => {
    doc.fontSize(10).text(`${work.position} at ${work.company} (${work.startDate} - ${work.endDate})`, { align: "left" });
    doc.fontSize(10).text(`Years: ${work.years}`, { align: "left" });
    doc.fontSize(10).text(`Description: ${work.description}`, { align: "left" });
  });

  doc.fontSize(12).text("Skills:", { align: "left" });
  doc.end();

  return outputPath;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

const attachCookie = (res, token) =>
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
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

// ─── User Profile ─────────────────────────────────────────────────────────────
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

    if (email || username) {
      const conflict = await User.findOne({
        _id: { $ne: req.user.id },
        $or: [
          ...(email ? [{ email }] : []),
          ...(username ? [{ username }] : []),
        ],
      });

      if (conflict) {
        return res.status(400).json({ message: "Email or username already in use" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: {
          ...(name !== undefined && { name }),
          ...(email !== undefined && { email }),
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

// ─── Profile Data ─────────────────────────────────────────────────────────────
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
    const {
      headline,
      bio,
      location,
      education,
      workExperience,
      skills,
      socialLinks,
    } = req.body;

    const $set = {};
    if (headline !== undefined) $set.headline = headline;
    if (bio !== undefined) $set.bio = bio;
    if (location !== undefined) $set.location = location;
    if (education !== undefined) $set.education = education;
    if (workExperience !== undefined) $set.workExperience = workExperience;
    if (skills !== undefined) $set.skills = skills;
    if (socialLinks !== undefined) $set.socialLinks = socialLinks;

    if (Object.keys($set).length === 0) {
      return res.status(400).json({ message: "No valid fields provided to update" });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      { $set },
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

export const getAllUserProfile = async (req, res) => {
  try {
    const profle = await Profile.find().populate("userId", "name email username profilePicture");
    return res.status(200).json({ message: "All profile fetched successfully", profle });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const downloadProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.findOne({ userId }).populate("userId", "name email username profilePicture");
    
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // 1. Tell the browser/Postman that a binary PDF file attachment is coming
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=My_Resume.pdf");

    // 2. Fire up PDFKit
    const doc = new PDFDocument();

    // 3. stream directly into the Express response object 'res'! 
    doc.pipe(res);
    
    // 4. Inject your profile details
    if (profile.userId?.profilePicture) {
      const imgPath = path.join("./uploads", profile.userId.profilePicture);
      if (fs.existsSync(imgPath)) {
        doc.image(imgPath, { fit: [100, 100], align: "center" });
      }
    }

    doc.fontSize(14).text(profile.userId?.name || "No Name", { align: "center" });
    doc.fontSize(12).text(profile.userId?.email || "", { align: "center" });
    doc.fontSize(12).text(profile.userId?.username || "", { align: "center" });
    doc.fontSize(12).text(profile.headline || "", { align: "center" });
    doc.fontSize(12).text(profile.bio || "", { align: "center" });
    doc.fontSize(12).text(profile.location || "", { align: "center" });
    
    doc.fontSize(12).text("Education:", { align: "left" });
    profile.education?.forEach(edu => {
      doc.fontSize(10).text(`${edu.degree} in ${edu.fieldOfStudy} from ${edu.school} (${edu.startDate} - ${edu.endDate})`, { align: "left" });
    });

    doc.fontSize(12).text("Work Experience:", { align: "left" });
    profile.workExperience?.forEach(work => {
      doc.fontSize(10).text(`${work.position} at ${work.company} (${work.startDate} - ${work.endDate})`, { align: "left" });
    });

    // 5. Finalize the document and close the server response stream
    doc.end();

  } catch (err) {
    // If headers already sent, don't try to send another JSON error
    if (!res.headersSent) {
      return res.status(500).json({ message: err.message });
    }
    console.error(err);
  }
};

// ─── Connection Handlers ──────────────────────────────────────────────────────
export const sentContectionRequest = async (req, res) => {
  const { connectionId } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const connectionUser = await User.findById(connectionId);
    if (!connectionUser) {
      return res.status(404).json({ message: "Connection target user not found!" });
    }

    const existRequest = await connectionRequest.findOne({
      userId: user._id,
      connectionId: connectionUser._id
    });

    if (existRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }

    const request = new connectionRequest({
      userId: user._id,
      connectionId: connectionUser._id
    });

    await request.save();
    return res.status(201).json({ message: "Request sent successfully" });

  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getMeConnectionRequest = async (req, res) => {
  try {
    const incomingRequests = await connectionRequest.find({ 
      connectionId: req.user.id,
      status: false 
    }).populate("userId", "name username email profilePicture");

    return res.json({ connections: incomingRequests });
  } catch (error) {
    return res.status(500).json({ message: "Server error: " + error.message });
  }
};

export const whatAreMyConnections = async (req, res) => {
  try {
    const userConnections = await connectionRequest.find({
      $or: [{ userId: req.user.id }, { connectionId: req.user.id }],
      status: true 
    }).populate("userId connectionId", "name username email profilePicture");

    return res.json(userConnections);
  } catch (error) {
    return res.status(500).json({ message: "Server error: " + error.message });
  }
};

export const acceptConnectionRequest = async (req, res) => {
  const { requestId, action_type } = req.body;
  
  try {
    const connectionObj = await connectionRequest.findById(requestId);

    if (!connectionObj) {
      return res.status(404).json({ message: "Connection request record not found" });
    }

    if (action_type === "accept") {
      connectionObj.status = true;
      await connectionObj.save();
      return res.json({ message: "Connection request accepted" }); 
    } else {
      await connectionRequest.findByIdAndDelete(requestId);
      return res.json({ message: "Connection request declined" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error: " + error.message });
  }
};


