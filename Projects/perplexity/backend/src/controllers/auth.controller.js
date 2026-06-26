import userModel from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../service/mail.service.js';


const COOKIE_OPTS = {
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};


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
    const exists = await userModel.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return res.status(400).json({ message: 'Username or email already exists', success: false });
    }

    const user = await userModel.create({ username, email, password });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    const link  = `${process.env.BACKEND_URL}/api/auth/verify-email?token=${token}`;

    try {
      await sendEmail({
        to: email,
        subject: 'Verify Your Email - Perplexity',
        html: `
          <h2>Welcome to Perplexity, ${username}! 🚀</h2>
          <p>Click below to verify your email:</p>
          <a href="${link}" style="display:inline-block;padding:12px 24px;background:#111;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">
            Verify Email
          </a>
          <p style="margin-top:16px;color:#666;">Or paste this link: ${link}</p>
        `,
      });
    } catch (e) {
      console.warn('Email send failed (user still created):', e.message);
    }

    res.status(201).json({
      message: 'Account created! Please check your email to verify before logging in.',
      success: true,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error('register error:', err);
    res.status(500).json({ message: 'Registration failed. Please try again.', success: false });
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
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.verified) {
      return res.send(`<!doctype html><html><body style="font-family:sans-serif;text-align:center;padding:60px">
        <h1>✅ Already Verified</h1><p>Your account is already verified.</p>
        <a href="${process.env.FRONTEND_URL}/login" style="color:#2563eb">Go to Login →</a>
      </body></html>`);
    }

    user.verified = true;
    await user.save();

    res.send(`<!doctype html><html><body style="font-family:sans-serif;text-align:center;padding:60px">
      <h1>🎉 Email Verified!</h1><p>You can now log in to Perplexity.</p>
      <a href="${process.env.FRONTEND_URL}/login" style="display:inline-block;padding:12px 24px;background:#111;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">
        Go to Login
      </a>
    </body></html>`);
  } catch (err) {
    res.status(400).send(`<!doctype html><html><body style="font-family:sans-serif;text-align:center;padding:60px">
      <h1>❌ Invalid Link</h1><p>This link has expired or is invalid.</p>
      <a href="${process.env.FRONTEND_URL}/register" style="color:#2563eb">Register again →</a>
    </body></html>`);
  }
}

/**
   * @description Authenticate user and return JWT token
   * @route POST /api/auth/login
   * @access Public
   * @body { email, password }
   * @returns { message, success, token }
 */
export async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid email or password', success: false });
    }
    if (!user.verified) {
      return res.status(400).json({ message: 'Please verify your email first. Check your inbox.', success: false });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, COOKIE_OPTS);
    res.status(200).json({
      message: 'Login successful',
      success: true,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error('login error:', err);
    res.status(500).json({ message: 'Login failed. Please try again.', success: false });
  }
}




export async function logout(req, res) {
  res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'none' });
  res.status(200).json({ message: 'Logged out successfully', success: true });
}



/**
 * @description Get current logged in user's profile
 * @route GET /api/auth/get-me
 * @access Private
 */

export async function getMe(req, res) {
  try {
    const user = await userModel.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found', success: false });
    res.status(200).json({ message: 'User fetched', success: true, user });
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
}