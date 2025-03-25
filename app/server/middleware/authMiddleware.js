import validator from 'validator';
import passport from 'passport';

const validateUserInput = (req, res, next) => {
    const { email, phone } = req.body;

    // Check if either email or phone is provided
    if (!email && !phone) {
        return res.status(400).json({ error: 'Email or phone number is required' });
    }

    // Validate email (if provided)
    if (email && !validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    // Validate phone number (if provided)
    if (phone && !validator.isMobilePhone(phone, 'any')) { // Allows international numbers
        return res.status(400).json({ error: 'Invalid phone number' });
    }

    next();
};

const requireAuth = passport.authenticate('jwt', { session: false });

const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    next();
  };
};

export{  validateUserInput, requireAuth, requireRole };