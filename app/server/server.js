import express from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js'
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

// Routes 
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Initialice server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});