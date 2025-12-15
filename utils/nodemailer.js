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
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div style="background-color: #1E4E9A; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 24px;">New Contact Form Submission</h2>
        </div>
        <div style="padding: 30px; background-color: #f8f9fa;">
          <div style="background-color: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 15px;">
              <strong style="color: #1E4E9A;">Name:</strong>
              <span style="color: #333333; margin-left: 10px;">${contact.fullName}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #1E4E9A;">Email:</strong>
              <span style="color: #333333; margin-left: 10px;">${contact.email}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #1E4E9A;">Phone:</strong>
              <span style="color: #333333; margin-left: 10px;">${contact.phone || 'Not provided'}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #1E4E9A;">Subject:</strong>
              <span style="color: #333333; margin-left: 10px;">${contact.subject}</span>
            </div>
            <div style="margin-top: 20px;">
              <strong style="color: #1E4E9A;">Message:</strong>
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 10px; color: #333333; line-height: 1.5;">
                ${contact.message}
              </div>
            </div>
          </div>
        </div>
        <div style="background-color: #E02020; color: white; padding: 15px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">NTCOGK Contact Form System</p>
        </div>
      </div>
    `
    };

    const confirmationEmail = {
        from: config.email.user,
        to: contact.email,
        subject: 'Thank you for contacting NTCOGK',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <div style="background-color: #E02020; color: white; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 24px;">Thank You for Contacting Us</h2>
        </div>
        <div style="padding: 30px; background-color: #f8f9fa;">
          <div style="background-color: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="color: #333333; font-size: 16px; margin-bottom: 20px;">Dear <strong style="color: #1E4E9A;">${contact.fullName}</strong>,</p>
            <p style="color: #333333; line-height: 1.6; margin-bottom: 20px;">
              We have received your message and will get back to you soon. Thank you for reaching out to the New Testament Church of God Kenya.
            </p>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; border-left: 4px solid #1E4E9A;">
              <p style="color: #1E4E9A; font-weight: bold; margin: 0 0 10px 0;">Your Message:</p>
              <p style="color: #333333; line-height: 1.5; margin: 0;">${contact.message}</p>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
              <p style="color: #333333; margin: 0;">Blessings,</p>
              <p style="color: #1E4E9A; font-weight: bold; margin: 5px 0 0 0;">NTCOGK Team</p>
            </div>
          </div>
        </div>
        <div style="background-color: #1E4E9A; color: white; padding: 15px; text-align: center;">
          <p style="margin: 0; font-size: 14px;">New Testament Church of God Kenya</p>
        </div>
      </div>
    `
    };

    await Promise.all([
        transporter.sendMail(adminEmail),
        transporter.sendMail(confirmationEmail)
    ]);
};