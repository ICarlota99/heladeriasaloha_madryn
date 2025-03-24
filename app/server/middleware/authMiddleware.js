import validator from 'validator';

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

export default validateUserInput;