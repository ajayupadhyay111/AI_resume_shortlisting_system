const transporter = require("../config/nodemailer");

// Function to send verification email
const sendVerificationEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification - Resume Shortlisting System',
            html: `
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
                    <h2 style="color: #333; text-align: center;">Email Verification</h2>
                    <p style="color: #666;">Hello,</p>
                    <p style="color: #666;">Thank you for registering. Please use the following OTP to verify your email address:</p>
                    <div style="background-color: #f4f4f4; padding: 10px; text-align: center; margin: 20px 0;">
                        <h1 style="color: #333; letter-spacing: 5px;">${otp}</h1>
                    </div>
                    <p style="color: #666;">This OTP will expire in 10 minutes.</p>
                    <p style="color: #666;">If you didn't request this verification, please ignore this email.</p>
                    <div style="text-align: center; margin-top: 20px; color: #999;">
                        <small>This is an automated email, please do not reply.</small>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Verification email sent:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
    }
};



module.exports =  sendVerificationEmail;