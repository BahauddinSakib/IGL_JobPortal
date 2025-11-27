// lib/email.js
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpEmail(name, recipientEmail, otp) {
    try {
        console.log('📧 Preparing to send email via Resend to:', recipientEmail);

        const { data, error } = await resend.emails.send({
            from: 'SmartDSM <bahauddinsakib3122@gmail.com>', // Use test domain or your verified domain
            to: recipientEmail,
            subject: 'Password Reset OTP - SmartDSM',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #007bff; }
                        .otp-container { background: #f8f9fa; padding: 20px; text-align: center; margin: 25px 0; border-radius: 8px; border: 1px dashed #007bff; }
                        .otp-code { font-size: 32px; font-weight: bold; color: #007bff; letter-spacing: 8px; margin: 10px 0; }
                        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; }
                        .warning { background: #fff3cd; color: #856404; padding: 10px; border-radius: 4px; margin: 15px 0; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h2 style="color: #007bff; margin: 0;">SmartDSM</h2>
                        <p style="margin: 5px 0 0 0; color: #666;">Password Reset Request</p>
                    </div>
                    
                    <p>Hello <strong>${name}</strong>,</p>
                    
                    <p>You have requested to reset your password for your SmartDSM admin account.</p>
                    
                    <div class="otp-container">
                        <p style="margin: 0 0 15px 0; font-size: 16px;">Your One-Time Password (OTP) is:</p>
                        <div class="otp-code">${otp}</div>
                        <p style="margin: 15px 0 0 0; font-size: 14px;">This OTP is valid for 10 minutes</p>
                    </div>
                    
                    <div class="warning">
                        <strong>Important:</strong> 
                        <ul style="margin: 10px 0; padding-left: 20px;">
                            <li>Do not share this OTP with anyone</li>
                            <li>If you didn't request this reset, please ignore this email</li>
                            <li>Contact support immediately if you suspect any unauthorized activity</li>
                        </ul>
                    </div>
                    
                    <p>Enter this OTP on the verification page to proceed with resetting your password.</p>
                    
                    <div class="footer">
                        <p>Best regards,<br><strong>SmartDSM Team</strong></p>
                        <p style="margin: 5px 0;">This is an automated message. Please do not reply to this email.</p>
                    </div>
                </body>
                </html>
            `,
        });

        if (error) {
            console.error('❌ Resend error:', error);
            return false;
        }

        console.log('✅ Email sent successfully via Resend. Message ID:', data.id);
        return true;
    } catch (error) {
        console.error('❌ Email sending error:', error);
        return false;
    }
}