import mongoose from 'mongoose';
import { config } from '../config/env.js';

const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(config.database.uri, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            bufferCommands: false,
            maxPoolSize: 10
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        console.log('\nTroubleshooting steps:');
        console.log('1. Check if your IP is whitelisted in MongoDB Atlas');
        console.log('2. Verify your MongoDB URI and credentials');
        console.log('3. Check your internet connection');
        console.log('4. Wait 2-3 minutes for IP whitelist to propagate');

    }
};

export default connectDB;