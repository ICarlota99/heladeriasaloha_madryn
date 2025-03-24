import bcrypt from 'bcryptjs';
import pool from '../config/db.js';
import generateVerificationToken from '../utils/tokenUtils.js';
import { sendVerificationEmail, sendVerificationSMS } from '../utils/emailSmsUtils.js';

const registerUser = async (req, res) => {
    const { username, email, phone, password } = req.body;

    try {
        // Hash the password
        const pwHash = await bcrypt.hash(password, 10);

        // Generate verification token
        const verificationToken = generateVerificationToken();
        const tokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // Token expires in 15 minutes

        // Save user to database
        const query = `
            INSERT INTO users (username, email, phone, pw_hash, verification_token, token_expires_at)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, email, phone;
        `;
        const values = [username, email, phone, pwHash, verificationToken, tokenExpiresAt];
        const result = await pool.query(query, values);

        // Send verification token
        if (email) {
            await sendVerificationEmail(email, verificationToken);
        } else if (phone) {
            await sendVerificationSMS(phone, verificationToken);
        }

        res.status(201).json({ message: 'User registered. Please verify your account.', user: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

export { registerUser };