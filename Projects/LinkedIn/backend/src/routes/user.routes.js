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
  acceptConnectionRequest,
  whatAreMyConnections,
  getMeConnectionRequest,
  sentContectionRequest, 
} from "../controllers/user.controller.js";

const router = Router();

// --- Multer Configuration ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    // Safely reads req.user.id because auth middleware will run first
    const userId = req.user?.id || "anonymous";
    cb(null, `${userId}_${Date.now()}${ext}`);
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

// --- Public Routes ---
router.route("/register").post(register);
router.route("/login").post(login);

// --- Protected Routes (Require Auth Middleware) ---
router.route("/get_user_and_profile").get(auth, getUserAndProfile);

router.route("/update_profile_picture").post(auth, upload.single("profile_picture"), uploadProfilePicture);

router.route("/user_update").patch(auth, updateUserProfile);
router.route("/update_profile_data").patch(auth, updateProfileData);
router.route("/get_AllUser_Profiles").get(auth, getAllUserProfile);
router.route("/download_resume").get(auth, downloadProfile);router.route("/send_connection_request").post(auth, sentContectionRequest);
router.route("/get_connection_request").get(auth, getMeConnectionRequest);
router.route("/user_connection_request").get(auth, whatAreMyConnections);
router.route("/accept_connection_request").post(auth, acceptConnectionRequest);

export default router;