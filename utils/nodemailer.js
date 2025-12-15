import nodemailer from 'nodemailer';
import { config } from '../config/env.js';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: config.email.secure,
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
});

export const sendContactEmail = async (contact) => {
  const adminEmail = {
    from: config.email.user,
    to: config.email.adminEmail,
    subject: config.email.subject,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 650px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.12);">
          
          <!-- Header -->
          <div style="background-color: #1E4E9A; padding: 40px 30px; text-align: center; position: relative;">
            <div style="width: 60px; height: 60px; background-color: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <div style="width: 24px; height: 24px; background-color: white; border-radius: 4px;"></div>
            </div>
            <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">New Contact Submission</h1>
            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">NTCOGK Website Contact Form</p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="background-color: #f8fafc; border-radius: 10px; padding: 30px; margin-bottom: 30px;">
              <h2 style="margin: 0 0 25px; color: #1E4E9A; font-size: 20px; font-weight: 600;">Contact Details</h2>
              
              <div style="display: grid; gap: 20px;">
                <div style="display: flex; align-items: center; padding: 15px; background-color: white; border-radius: 8px; border-left: 4px solid #1E4E9A;">
                  <div style="width: 40px; height: 40px; background-color: #e8f2ff; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                    <div style="width: 16px; height: 16px; background-color: #1E4E9A; border-radius: 50%;"></div>
                  </div>
                  <div>
                    <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Full Name</p>
                    <p style="margin: 4px 0 0; font-size: 16px; color: #1e293b; font-weight: 500;">${contact.fullName}</p>
                  </div>
                </div>

                <div style="display: flex; align-items: center; padding: 15px; background-color: white; border-radius: 8px; border-left: 4px solid #10b981;">
                  <div style="width: 40px; height: 40px; background-color: #ecfdf5; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                    <div style="width: 16px; height: 16px; background-color: #10b981; border-radius: 50%;"></div>
                  </div>
                  <div>
                    <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Email Address</p>
                    <p style="margin: 4px 0 0; font-size: 16px; color: #1e293b; font-weight: 500;">${contact.email}</p>
                  </div>
                </div>

                <div style="display: flex; align-items: center; padding: 15px; background-color: white; border-radius: 8px; border-left: 4px solid #f59e0b;">
                  <div style="width: 40px; height: 40px; background-color: #fffbeb; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                    <div style="width: 16px; height: 16px; background-color: #f59e0b; border-radius: 50%;"></div>
                  </div>
                  <div>
                    <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Phone Number</p>
                    <p style="margin: 4px 0 0; font-size: 16px; color: #1e293b; font-weight: 500;">${contact.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div style="display: flex; align-items: center; padding: 15px; background-color: white; border-radius: 8px; border-left: 4px solid #8b5cf6;">
                  <div style="width: 40px; height: 40px; background-color: #f3f4f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                    <div style="width: 16px; height: 16px; background-color: #8b5cf6; border-radius: 50%;"></div>
                  </div>
                  <div>
                    <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Subject</p>
                    <p style="margin: 4px 0 0; font-size: 16px; color: #1e293b; font-weight: 500;">${contact.subject}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Message Section -->
            <div style="background-color: #f8fafc; border-radius: 10px; padding: 30px;">
              <h3 style="margin: 0 0 20px; color: #1E4E9A; font-size: 18px; font-weight: 600;">Message</h3>
              <div style="background-color: white; padding: 25px; border-radius: 8px; border-left: 4px solid #E02020;">
                <p style="margin: 0; color: #374151; line-height: 1.7; font-size: 15px;">${contact.message}</p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #E02020; padding: 25px 30px; text-align: center;">
            <p style="margin: 0; color: white; font-size: 14px; font-weight: 500;">New Testament Church of God Kenya</p>
            <p style="margin: 5px 0 0; color: rgba(255,255,255,0.8); font-size: 12px;">Contact Form Management System</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  const confirmationEmail = {
    from: config.email.user,
    to: contact.email,
    subject: 'Thank you for contacting NTCOGK',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You - NTCOGK</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
        <div style="max-width: 650px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.12);">
          
          <!-- Header -->
          <div style="background-color: #E02020; padding: 40px 30px; text-align: center;">
            <div style="width: 60px; height: 60px; background-color: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
              <div style="width: 20px; height: 12px; border-left: 3px solid white; border-bottom: 3px solid white; transform: rotate(-45deg); margin-top: -3px;"></div>
            </div>
            <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">Message Received!</h1>
            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Thank you for contacting us</p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 30px;">
            
            <!-- Greeting -->
            <div style="text-align: center; margin-bottom: 35px;">
              <h2 style="margin: 0 0 15px; color: #1e293b; font-size: 24px; font-weight: 600;">Dear ${contact.fullName},</h2>
              <p style="margin: 0; color: #64748b; font-size: 16px; line-height: 1.6;">We have successfully received your message and appreciate you reaching out to the New Testament Church of God Kenya.</p>
            </div>

            <!-- Status Card -->
            <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 25px; margin-bottom: 30px; text-align: center;">
              <div style="width: 50px; height: 50px; background-color: #22c55e; border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center;">
                <div style="width: 20px; height: 12px; border-left: 3px solid white; border-bottom: 3px solid white; transform: rotate(-45deg); margin-top: -3px;"></div>
              </div>
              <h3 style="margin: 0 0 8px; color: #15803d; font-size: 18px; font-weight: 600;">Message Delivered Successfully</h3>
              <p style="margin: 0; color: #166534; font-size: 14px;">Our team will review your message and respond within 24-48 hours.</p>
            </div>

            <!-- Message Summary -->
            <div style="background-color: #f8fafc; border-radius: 10px; padding: 30px; margin-bottom: 30px;">
              <h3 style="margin: 0 0 20px; color: #1E4E9A; font-size: 18px; font-weight: 600;">Your Message Summary</h3>
              
              <div style="background-color: white; border-radius: 8px; padding: 25px; border-left: 4px solid #1E4E9A;">
                <div style="margin-bottom: 15px;">
                  <p style="margin: 0 0 5px; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Subject</p>
                  <p style="margin: 0; font-size: 16px; color: #1e293b; font-weight: 500;">${contact.subject}</p>
                </div>
                <div style="border-top: 1px solid #e2e8f0; padding-top: 15px;">
                  <p style="margin: 0 0 10px; font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Message</p>
                  <p style="margin: 0; color: #374151; line-height: 1.7; font-size: 15px;">${contact.message}</p>
                </div>
              </div>
            </div>

            <!-- Next Steps -->
            <div style="background-color: #fef3c7; border-radius: 10px; padding: 25px; margin-bottom: 30px;">
              <h3 style="margin: 0 0 15px; color: #92400e; font-size: 16px; font-weight: 600;">What happens next?</h3>
              <ul style="margin: 0; padding-left: 20px; color: #78350f;">
                <li style="margin-bottom: 8px; font-size: 14px;">Our team will review your message carefully</li>
                <li style="margin-bottom: 8px; font-size: 14px;">You'll receive a personal response within 24-48 hours</li>
                <li style="margin-bottom: 0; font-size: 14px;">For urgent matters, please call +254 759 120 222</li>
              </ul>
            </div>

            <!-- Contact Info -->
            <div style="text-align: center; padding: 25px; background-color: #f8fafc; border-radius: 10px;">
              <h4 style="margin: 0 0 15px; color: #1e293b; font-size: 16px; font-weight: 600;">Need immediate assistance?</h4>
              <p style="margin: 0 0 10px; color: #64748b; font-size: 14px;">Phone: <strong style="color: #1E4E9A;">+254 759 120 222</strong></p>
              <p style="margin: 0; color: #64748b; font-size: 14px;">Email: <strong style="color: #1E4E9A;">ntcogk@gmail.com</strong></p>
            </div>

            <!-- Closing -->
            <div style="text-align: center; margin-top: 35px; padding-top: 25px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 8px; color: #374151; font-size: 16px;">Blessings and Peace,</p>
              <p style="margin: 0; color: #1E4E9A; font-size: 18px; font-weight: 600;">The NTCOGK Team</p>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #1E4E9A; padding: 25px 30px; text-align: center;">
            <p style="margin: 0 0 5px; color: white; font-size: 16px; font-weight: 600;">New Testament Church of God Kenya</p>
            <p style="margin: 0; color: rgba(255,255,255,0.8); font-size: 12px;">Kwarara Rd/Ndege Rd, Off Bugani Rd, Karen, Nairobi</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  await Promise.all([
    transporter.sendMail(adminEmail),
    transporter.sendMail(confirmationEmail)
  ]);
};