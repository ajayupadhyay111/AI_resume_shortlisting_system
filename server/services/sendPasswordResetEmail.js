const transporter = require("../config/nodemailer");

// Function to send password reset email
const sendPasswordResetEmail = async (email, resetToken) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset - Resume Shortlisting System',
            html: `
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
                    <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
                    <p style="color: #666;">Hello,</p>
                    <p style="color: #666;">We received a request to reset your password. Click the button below to reset it:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${process.env.FrontendURL}/reset-password/${resetToken}" 
                           style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px;">
                            Reset Password
                        </a>
                    </div>
                    <p style="color: #666;">This link will expire in 1 hour.</p>
                    <p style="color: #666;">If you didn't request this, please ignore this email.</p>
                    <div style="text-align: center; margin-top: 20px; color: #999;">
                        <small>This is an automated email, please do not reply.</small>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Password reset email sent:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw error;
    }
};

module.exports = sendPasswordResetEmail;