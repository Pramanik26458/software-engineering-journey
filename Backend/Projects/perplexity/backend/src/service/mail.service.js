import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type:'OAuth2',
        user: process.env.GOOGLE_USER,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        clientId: process.env.GOOGLE_CLIENT_ID
    }
});

transporter.verify() 

.then(()=>{console.log('Email service is ready to send messages');})
.catch((error)=>{console.error('Email transporter verification failed:', error);});

export async function sendEmail({ to, subject, html, text = '' }) {
   try {
       const mailOptions = {
           from: process.env.GOOGLE_USER,
           to,
           subject,
           html,
           text
       };

       const details = await transporter.sendMail(mailOptions);
       console.log('Email sent successfully:', details);
       return details;
   } catch (error) {
       console.error('Failed to send email:', error);
       throw error;
   }
}
