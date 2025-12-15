import mongoose from 'mongoose';
import { config } from '../config/env.js';

const connectDB = async () => {
    try {
        await mongoose.connect(config.database.uri, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        console.log('Please check:');
        console.log('1. Your IP is whitelisted in MongoDB Atlas');
        console.log('2. Your MongoDB URI is correct');
        console.log('3. Your network connection is stable');
        process.exit(1);
    }
};

export default connectDB;