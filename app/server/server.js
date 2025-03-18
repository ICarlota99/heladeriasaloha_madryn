import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import './config/passport.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Routes 
app.use('/api/auth', authRoutes);

// Initialice server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});