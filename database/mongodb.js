import mongoose from 'mongoose';
import { config } from '../config/env.js';

const connectDB = async () => {
    try {
        await mongoose.connect(config.database.uri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

export default connectDB;