import { body } from 'express-validator';

export const validateContact = [
    body('fullName')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Full name must be between 2-100 characters'),

    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required'),

    body('phone')
        .optional()
        .isMobilePhone()
        .withMessage('Valid phone number required'),

    body('subject')
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage('Subject is required'),

    body('message')
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('Message must be between 10-2000 characters')
];