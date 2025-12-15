import rateLimit from 'express-rate-limit';
import { config } from '../config/env.js';

export const contactRateLimit = rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    message: {
        success: false,
        message: 'Too many requests. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false
});