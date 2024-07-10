import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()
console.log(`Mongo URL: ${process.env.MONGODB}`);

mongoose.connect(process.env.MONGODB);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

export default {
    port: process.env.PORT || 8080,
    mongoURI: process.env.MONGODB,
    sessionSecret: process.env.SESSION_SECRET || 'secretkey'
};