import express from 'express';
import { 
    registerUser, 
    verifyUser, 
    loginUser, 
    logoutUser,
    getProfile 
  } from '../controllers/authController.js';
import { validateUserInput, requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/register', validateUserInput, registerUser);
router.get('/verify', verifyUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', requireAuth, getProfile);

export default router;