import express from 'express';
import contactRoutes from './contact.js';

const router = express.Router();

router.use('/contact', contactRoutes);

export default router;