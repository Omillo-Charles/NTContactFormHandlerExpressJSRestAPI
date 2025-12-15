import { validationResult } from 'express-validator';
import Contact from '../models/contact.js';
import { sendContactEmail } from '../utils/nodemailer.js';

export const submitContact = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const { fullName, email, phone, subject, message } = req.body;

        const contact = new Contact({
            fullName,
            email,
            phone,
            subject,
            message
        });

        await contact.save();
        await sendContactEmail(contact);

        res.status(201).json({
            success: true,
            message: 'Contact form submitted successfully'
        });

    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.'
        });
    }
};