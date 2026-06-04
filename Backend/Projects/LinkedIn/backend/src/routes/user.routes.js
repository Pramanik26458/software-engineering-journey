import { Router } from "express";
import multer from "multer";
import path from "path";
import auth from "../middlewares/auth.middleware.js";
import {
  register,
  login,
  uploadProfilePicture,
  updateUserProfile,
  getUserAndProfile,
  updateProfileData,
  getAllUserProfile,
  downloadProfile,
} from "../controllers/user.controller.js";

const router = Router();

// Multer config — only for the profile picture route
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${req.user.id}_${Date.now()}${ext}`);
  },
});

const imageFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.test(ext) && allowed.test(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed (jpeg, jpg, png, webp)"));
  }
};

const upload = multer({ storage, fileFilter: imageFilter });

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/get_user_and_profile", auth, getUserAndProfile);
router.post("/update_profile_picture", auth, upload.single("profile_picture"), uploadProfilePicture);
router.patch("/user_update", auth, updateUserProfile);
router.patch("/update_profile_data", auth, updateProfileData);
router.get("/get_AllUser_Profiles", auth, getAllUserProfile);
router.get("/download_resume", auth, downloadProfile); // Reuse the same controller for PDF export
export default router;