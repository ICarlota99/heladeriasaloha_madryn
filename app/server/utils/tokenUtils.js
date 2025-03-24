import crypto from 'crypto';

const generateVerificationToken = () => {
    return crypto.randomBytes(20).toString('hex'); // Generate a random token
};

export default generateVerificationToken;