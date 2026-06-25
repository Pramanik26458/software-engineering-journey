import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../service/mail.service.js";


/**
 * 
 * @description Register a new user and send email verification link 
 * @route POST /api/auth/register
 * @access Public
 * @body { username, email, password }
 * @returns { message, success, user }
 */
export async function register(req, res) {
  const { username, email, password } = req.body;

  try {
    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "Username or email already exists",
        success: false,
      });
    }

    const user = await userModel.create({
      username,
      email,
      password,
    });

    const emailVerificationToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

const verificationLink = `${process.env.BACKEND_URL}/api/auth/verify-email?token=${emailVerificationToken}`;

    try {
      await sendEmail({
        to: email,
        subject: "Verify Your Email - Perplexity",
        html: `
          <h2>Welcome to Perplexity, ${username}! 🚀</h2>

          <p>Thank you for registering.</p>

          <p>Please verify your email by clicking the button below:</p>

          <a href="${verificationLink}"
             style="
               display:inline-block;
               padding:12px 20px;
               background:#2563eb;
               color:white;
               text-decoration:none;
               border-radius:6px;
             ">
             Verify Email
          </a>

          <p>If the button doesn't work, copy and paste this link:</p>

          <p>${verificationLink}</p>

          <br />
          <p>If you did not create an account, no further action is required.</p>
          <p>Best Regards,</p>
          <p>Perplexity Team</p>
        `,
      });
    } catch (emailError) {
      console.warn(
        "Email could not be sent, but user was created:",
        emailError.message
      );
    }

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        verified: user.verified,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to register user",
      success: false,
      err: err.message,
    });
  }
}

/**
 * 
 * @description Verify user's email address
 * @route GET /api/auth/verify-email
 * @access Public
 */
export async function verifyEmail(req, res) {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (user.verified) {
      return res.send(`
        <h1>Email Already Verified ✅</h1>
        <p>Your account has already been verified.</p>
        <a href="/login">Go to Login</a>
      `);
    }

    user.verified = true;
    await user.save();

    res.send(`
      <h1>Email Verified Successfully 🎉</h1>
      <p>Your email has been verified.</p>
      <p>You can now log in to your account.</p>
      <a href="/login">Go to Login</a>
    `);
  } catch (err) {
    res.status(400).json({
      message: "Invalid or expired token",
      success: false,
      err: err.message,
    });
  }
}

/**
   * @description Authenticate user and return JWT token
   * @route POST /api/auth/login
   * @access Public
   * @body { email, password }
   * @returns { message, success, token }
 */

export async function login(req,res){
  const user = await userModel.findOne({email:req.body.email});

  if(!user){
    return res.status(400).json({
      message:"Invalid email or password",
      success:false
    });
  }

  if(!user.verified){
    return res.status(400).json({
      message:"Please verify your email before logging in",
      success:false
    });
  }
  
  

  const token=jwt.sign({
    id:user._id,
    username:user.username
  },process.env.JWT_SECRET,{
    expiresIn:'7d'    
  })

  res.cookie('token',token,{
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    sameSite:'strict',
    maxAge:7*24*60*60*1000
  })

  res.status(200).json({
    message:"Login successful",
    success:true,
    user:{
      id:user._id,
      username:user.username,
      email:user.email
    }
  });


}


/**
 * @description Get current logged in user's profile
 * @route GET /api/auth/get-me
 * @access Private
 */

export  async function getMe(req,res){
  const userId=req.user.id;
  const user=await userModel.findById(userId).select('-password');

  if(!user){
    return res.status(404).json({
      message:"User not found",
      success:false
    });
  }
  res.status(200).json({
    message:"User profile fetched successfully",
    success:true,
    user
  });

  
}