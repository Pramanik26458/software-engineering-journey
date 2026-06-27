import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../service/mail.service.js";

/**
 * @description Register a new user and send email verification link
 * @route POST /api/auth/register
 * @access Public
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

    const user = await userModel.create({ username, email, password });

    const emailVerificationToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    const backendUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 3000}`;
    const verificationLink = `${backendUrl}/api/auth/verify-email?token=${emailVerificationToken}`;

    try {
      await sendEmail({
        to: email,
        subject: "Verify Your Email - Perplexity",
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#111113;border-radius:16px;border:1px solid rgba(255,255,255,.1)">
            <div style="text-align:center;margin-bottom:28px">
              <h1 style="color:#ececec;font-size:22px;font-weight:700;margin:0 0 6px">Welcome to Perplexity 🚀</h1>
              <p style="color:rgba(255,255,255,.5);font-size:14px;margin:0">Hi <strong style="color:#ececec">${username}</strong>, thanks for registering!</p>
            </div>
            <p style="color:rgba(255,255,255,.65);font-size:14px;line-height:1.7;margin:0 0 24px">
              Please verify your email address to activate your account and start using Perplexity AI.
            </p>
            <div style="text-align:center;margin:28px 0">
              <a href="${verificationLink}"
                 style="display:inline-block;padding:13px 28px;background:#e0e0e0;color:#000;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;letter-spacing:-.01em">
                Verify Email Address
              </a>
            </div>
            <p style="color:rgba(255,255,255,.35);font-size:12px;margin:24px 0 0;text-align:center">
              Link expires in 30 days. If you didn't create an account, ignore this email.
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.warn("Email could not be sent, but user was created:", emailError.message);
    }

    res.status(201).json({
      message: "User registered successfully. Please check your email to verify your account.",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        verified: user.verified,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({
      message: "Failed to register user",
      success: false,
      err: err.message,
    });
  }
}

/**
 * @description Verify user's email address
 * @route GET /api/auth/verify-email
 * @access Public
 */
export async function verifyEmail(req, res) {
  const { token } = req.query;

  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

  if (!token) {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><title>Invalid Link</title>
      <style>body{font-family:-apple-system,sans-serif;background:#111113;color:#ececec;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
      .box{max-width:420px;text-align:center;padding:40px 32px;background:#18181b;border:1px solid rgba(255,255,255,.1);border-radius:16px}
      h1{font-size:22px;margin:0 0 12px}p{color:rgba(255,255,255,.55);font-size:14px;line-height:1.7;margin:0 0 24px}
      a{display:inline-block;padding:11px 24px;background:#e0e0e0;color:#000;text-decoration:none;border-radius:9px;font-size:14px;font-weight:600}</style>
      </head><body><div class="box"><h1>❌ Invalid Link</h1><p>The verification link is missing or malformed.</p><a href="${frontendUrl}/login">Go to Login</a></div></body></html>
    `);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId);

    if (!user) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8"><title>Not Found</title>
        <style>body{font-family:-apple-system,sans-serif;background:#111113;color:#ececec;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
        .box{max-width:420px;text-align:center;padding:40px 32px;background:#18181b;border:1px solid rgba(255,255,255,.1);border-radius:16px}
        h1{font-size:22px;margin:0 0 12px}p{color:rgba(255,255,255,.55);font-size:14px;line-height:1.7;margin:0 0 24px}
        a{display:inline-block;padding:11px 24px;background:#e0e0e0;color:#000;text-decoration:none;border-radius:9px;font-size:14px;font-weight:600}</style>
        </head><body><div class="box"><h1>❌ User Not Found</h1><p>We couldn't find an account linked to this verification link.</p><a href="${frontendUrl}/register">Create Account</a></div></body></html>
      `);
    }

    if (user.verified) {
      return res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8"><title>Already Verified</title>
        <meta http-equiv="refresh" content="4;url=${frontendUrl}/login">
        <style>body{font-family:-apple-system,sans-serif;background:#111113;color:#ececec;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
        .box{max-width:420px;text-align:center;padding:40px 32px;background:#18181b;border:1px solid rgba(255,255,255,.1);border-radius:16px}
        h1{font-size:22px;margin:0 0 12px}p{color:rgba(255,255,255,.55);font-size:14px;line-height:1.7;margin:0 0 24px}
        a{display:inline-block;padding:11px 24px;background:#e0e0e0;color:#000;text-decoration:none;border-radius:9px;font-size:14px;font-weight:600}</style>
        </head><body><div class="box"><h1>✅ Already Verified</h1><p>Your account is already verified. Redirecting you to login…</p><a href="${frontendUrl}/login">Go to Login</a></div></body></html>
      `);
    }

    user.verified = true;
    await user.save();

    return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><title>Email Verified</title>
      <meta http-equiv="refresh" content="4;url=${frontendUrl}/login">
      <style>body{font-family:-apple-system,sans-serif;background:#111113;color:#ececec;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
      .box{max-width:420px;text-align:center;padding:40px 32px;background:#18181b;border:1px solid rgba(255,255,255,.1);border-radius:16px}
      .icon{width:60px;height:60px;border-radius:50%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:26px;margin:0 auto 20px}
      h1{font-size:22px;margin:0 0 12px}p{color:rgba(255,255,255,.55);font-size:14px;line-height:1.7;margin:0 0 24px}
      a{display:inline-block;padding:11px 24px;background:#e0e0e0;color:#000;text-decoration:none;border-radius:9px;font-size:14px;font-weight:600}
      .sub{color:rgba(255,255,255,.3);font-size:12px;margin-top:16px}</style>
      </head>
      <body>
        <div class="box">
          <div class="icon">🎉</div>
          <h1>Email Verified!</h1>
          <p>Your account has been successfully verified. You can now log in and start using Perplexity AI.</p>
          <a href="${frontendUrl}/login">Sign In Now →</a>
          <p class="sub">You'll be redirected automatically in 4 seconds.</p>
        </div>
      </body>
      </html>
    `);
  } catch (err) {
    const isExpired = err.name === "TokenExpiredError";
    return res.status(400).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><title>Link Expired</title>
      <style>body{font-family:-apple-system,sans-serif;background:#111113;color:#ececec;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}
      .box{max-width:420px;text-align:center;padding:40px 32px;background:#18181b;border:1px solid rgba(255,255,255,.1);border-radius:16px}
      h1{font-size:22px;margin:0 0 12px}p{color:rgba(255,255,255,.55);font-size:14px;line-height:1.7;margin:0 0 24px}
      a{display:inline-block;padding:11px 24px;background:#e0e0e0;color:#000;text-decoration:none;border-radius:9px;font-size:14px;font-weight:600}</style>
      </head>
      <body>
        <div class="box">
          <h1>❌ ${isExpired ? "Link Expired" : "Invalid Link"}</h1>
          <p>${isExpired ? "This verification link has expired. Please register again to get a new link." : "This verification link is invalid or has already been used."}</p>
          <a href="${frontendUrl}/register">Register Again</a>
        </div>
      </body>
      </html>
    `);
  }
}

/**
 * @description Authenticate user and return JWT token
 * @route POST /api/auth/login
 * @access Public
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid email or password", success: false });
    }

    if (!user.verified) {
      return res.status(403).json({
        message: "Please verify your email before logging in. Check your inbox for the verification link.",
        success: false,
        unverified: true,
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      success: true,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", success: false });
  }
}

/**
 * @description Logout user by clearing cookie
 * @route POST /api/auth/logout
 * @access Public
 */
export async function logout(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.status(200).json({ message: "Logged out successfully", success: true });
}

/**
 * @description Get current logged-in user's profile
 * @route GET /api/auth/get-me
 * @access Private
 */
export async function getMe(req, res) {
  try {
    const user = await userModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    res.status(200).json({ message: "User profile fetched", success: true, user });
  } catch (err) {
    console.error("getMe error:", err);
    res.status(500).json({ message: "Failed to fetch user", success: false });
  }
}
