import express from 'express';
import { submitContact } from '../controllers/contact.js';
import { validateContact } from '../middlewares/validation.js';
import { contactRateLimit } from '../middlewares/security.js';

const router = express.Router();

router.post('/', contactRateLimit, validateContact, submitContact);

export default router;