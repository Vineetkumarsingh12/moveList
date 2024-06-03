import dotenv from 'dotenv';
import express from 'express';

import cors from 'cors';
import { connectDB } from './utils/features.js';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from "cloudinary";
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    callback(null, true); 
  },
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


app.get('/api/v1', (req, res) => {
    res.send('Hello World');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
