import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

console.log('Gmail Config:', {
  user: process.env.GOOGLE_USER,
  clientId: process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Missing',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Missing',
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN ? 'Set' : 'Missing',
});

// ── ✅ FIX 2: Create OAuth2 client ONCE and cache the access token ────────────
// Root cause of slowness: nodemailer was fetching a new OAuth2 access token
// on every single email. Each token fetch = extra HTTP round trip to Google
// (~1–3 seconds). In production this is even slower due to cold starts.
//
// Solution: Use googleapis OAuth2Client directly, cache the token in memory,
// and only refresh it when it expires (every ~60 minutes).

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Token cache — refreshed only when expired
let cachedAccessToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
  const now = Date.now();

  // Return cached token if still valid (with 60s buffer)
  if (cachedAccessToken && now < tokenExpiresAt - 60_000) {
    return cachedAccessToken;
  }

  // Fetch a fresh token
  console.log('🔑 Refreshing OAuth2 access token...');
  const { token, res } = await oauth2Client.getAccessToken();

  cachedAccessToken = token;
  // Google tokens typically expire in 3600s; use expiry_date if available
  tokenExpiresAt = res?.data?.expiry_date || now + 3600_000;

  console.log('✅ Access token refreshed, valid for ~1 hour');
  return cachedAccessToken;
}

let _transporter = null;

async function getTransporter() {
  if (_transporter) return _transporter;

  const accessToken = await getAccessToken();

  _transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GOOGLE_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken, // ← pre-loaded, no fetch needed on send
    },
    // Keep the SMTP connection alive between sends
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
  });

  // Verify once on creation
  _transporter.verify((error) => {
    if (error) {
      console.error('❌ Email transporter verification failed:', error);
      _transporter = null; 
    } else {
      console.log('✅ Email service is ready to send messages');
    }
  });

  return _transporter;
}


getTransporter().catch(err =>
  console.warn('⚠️  Email warm-up failed (will retry on send):', err.message)
);

// ── Send email ────────────────────────────────────────────────────────────────
export async function sendEmail({ to, subject, html, text = '' }) {
  try {
    if (!to) throw new Error('Email recipient (to) is required');
    if (!subject) throw new Error('Email subject is required');
    if (!html && !text) throw new Error('Email body (html or text) is required');

    const mailOptions = {
      from: process.env.GOOGLE_USER,
      to,
      subject,
      html: html || '',
      text: text || '',
    };

    console.log('📧 Sending email to:', to);

    // If the cached token has expired, reset transporter so it rebuilds
    if (Date.now() >= tokenExpiresAt - 60_000) {
      console.log('🔄 Token near expiry — refreshing transporter...');
      _transporter = null;
      cachedAccessToken = null;
    }

    const transporter = await getTransporter();
    const details = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully. Message ID:', details.messageId);
    return details;
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);

    // If auth error, reset so next send gets a fresh token + transporter
    if (error.message?.includes('auth') || error.message?.includes('token') || error.responseCode === 535) {
      console.log('🔄 Auth error detected — resetting transporter for next attempt');
      _transporter = null;
      cachedAccessToken = null;
    }

    throw error;
  }
}