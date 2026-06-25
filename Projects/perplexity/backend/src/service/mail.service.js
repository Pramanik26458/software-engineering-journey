import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('Gmail Config:', {
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Missing',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Missing',
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN ? 'Set' : 'Missing'
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN
    }
});

// Verify transporter
transporter.verify(function(error, success) {
    if (error) {
        console.error('❌ Email transporter verification failed:', error);
    } else {
        console.log('✅ Email service is ready to send messages');
    }
});

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
           text: text || ''
       };

       console.log('📧 Sending email to:', to);
       const details = await transporter.sendMail(mailOptions);
       console.log('✅ Email sent successfully. Message ID:', details.messageId);
       return details;
   } catch (error) {
       console.error('❌ Failed to send email:', error.message);
       console.error('Error details:', error);
       throw error;
   }
}
