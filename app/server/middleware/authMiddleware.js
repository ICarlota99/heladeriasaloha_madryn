import validator from 'validator';
import passport from 'passport';

const validateUserInput = (req, res, next) => {
    const { email } = req.body;

    // Check if email is provided and valid
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    next(); // Proceed if validation passes
};

const requireAuth = passport.authenticate('jwt', { session: false });

const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        next();
    };
};

export { validateUserInput, requireAuth, requireRole };