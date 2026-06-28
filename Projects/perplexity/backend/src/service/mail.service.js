import { Resend } from 'resend';

// ── ✅ Resend is used instead of Gmail OAuth2 because:
//    1. Gmail OAuth tokens expire and need re-fetching (slow on cold starts)
//    2. Render free tier sleeps and loses in-memory token cache
//    3. Resend is instant (~200ms), free (100 emails/day), and zero config
// ─────────────────────────────────────────────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html, text = '' }) {
  try {
    if (!to) throw new Error('Email recipient (to) is required');
    if (!subject) throw new Error('Email subject is required');
    if (!html && !text) throw new Error('Email body (html or text) is required');

    console.log('📧 Sending email to:', to);

    const { data, error } = await resend.emails.send({
      from: 'Perplexity <onboarding@resend.dev>',
      to,
      subject,
      html: html || '',
      text: text || '',
    });

    if (error) {
      console.error('❌ Resend error:', error);
      throw new Error(error.message);
    }

    console.log('✅ Email sent successfully. ID:', data.id);
    return data;
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
    throw error;
  }
}