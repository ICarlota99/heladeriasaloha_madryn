import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productsRoutes.js'
import './config/passport.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(passport.initialize());
app.use(cors());

// Serve static files from the "public" folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));

// Rate limiter for auth routes (5 attempts/hour per IP)
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5,                   // Max 5 attempts per IP
  message: 'Demasiados intentos fallidos. Vuelva a intentar en 1 hora',
  skipSuccessfulRequests: true, // Don't count successful logins
});

// Apply rate limiting to sensitive auth routes
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);

// Routes 
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Initialice server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});