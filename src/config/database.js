import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  

console.log(`Mongo URL: ${process.env.mongoURI}`);  

mongoose.connect(process.env.mongoURI)  
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('MongoDB connection is open.');
});

export default {
    port: process.env.PORT || 8080,
    mongoURI: process.env.mongoURI,
    sessionSecret: process.env.SESSION_SECRET || 'secretkey',
    persistence: process.env.PERSISTENCE || 'MONGO'  
};
