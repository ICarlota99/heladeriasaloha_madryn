const express = require('express');
const passport = require('passport');
const authRoutes = require('./routes/auth');
require('dotenv').config();
require('./config/passport');

const app = express();

// Middleware
app.use(express.json());
app.use(passport.initialize());

// Routes 
app.use('/api/auth', authRoutes);

// Initialice server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});