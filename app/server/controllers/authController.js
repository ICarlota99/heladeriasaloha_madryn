import bcrypt from 'bcryptjs';
import pool from '../config/db.js';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import generateVerificationToken from '../utils/tokenUtils.js';
import { sendVerificationEmail, sendVerificationSMS } from '../utils/emailSmsUtils.js';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

// JWT configuration
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// Configure Passport strategies
passport.use(new LocalStrategy({
  usernameField: 'email_or_phone', // Can be email or phone
  passwordField: 'password'
}, async (emailOrPhone, password, done) => {
  try {
    // Find user by email or phone
    const user = await pool.query(
      `SELECT * FROM users 
       WHERE email = $1 OR phone = $1`,
      [emailOrPhone]
    );

    if (user.rows.length === 0) {
      return done(null, false, { message: 'User not found' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.rows[0].pw_hash);
    if (!isValidPassword) {
      return done(null, false, { message: 'Incorrect password' });
    }

    return done(null, user.rows[0]);
  } catch (error) {
    return done(error);
  }
}));

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await pool.query('SELECT * FROM users WHERE id = $1', [payload.id]);
      if (user.rows.length > 0) {
        return done(null, user.rows[0]);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error);
    }
  }));

// Register route
const registerUser = async (req, res) => {
    const { username, email, phone, password } = req.body;

    try {
        // Hash the password
        const pwHash = await bcrypt.hash(password, 10);
        const verificationToken = generateVerificationToken();
        const tokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        // Store in unverified_users
        const query = `
            INSERT INTO unverified_users 
            (username, email, phone, pw_hash, verification_token, token_expires_at)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id;
        `;
        const values = [username, email, phone, pwHash, verificationToken, tokenExpiresAt];
        await pool.query(query, values);

        // Send verification token
        if (email) {
            await sendVerificationEmail(email, verificationToken);
        } else if (phone) {
            await sendVerificationSMS(phone, verificationToken);
        }

        res.status(200).json({ 
            message: 'Verification sent. Please check your email/phone.',
            expires_in: '15 minutes'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

// Verify user
const verifyUser = async (req, res) => {
    const { token } = req.query;

    try {
        // 1. Check if token is valid and not expired
        const unverifiedUser = await pool.query(`
            SELECT * FROM unverified_users 
            WHERE verification_token = $1 
            AND token_expires_at > NOW()
        `, [token]);

        if (unverifiedUser.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        const { username, email, phone, pw_hash } = unverifiedUser.rows[0];
        const now = new Date(); // Get current timestamp

        // 2. Move to verified users table
        await pool.query('BEGIN'); // Start transaction

        const newUser = await pool.query(`
            INSERT INTO users 
            (username, email, phone, pw_hash, created_at)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, username, email, phone, created_at
        `, [username, email, phone, pw_hash, now]);

        // 3. Clean up
        await pool.query(`
            DELETE FROM unverified_users 
            WHERE verification_token = $1
        `, [token]);

        await pool.query('COMMIT'); // Commit transaction

        res.status(201).json({ 
            message: 'Account verified and created successfully',
            user: newUser.rows[0] 
        });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ error: 'Verification failed' });
    }
};

// Login controller
const loginUser = async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return res.status(500).json({ error: 'Login failed' });
      }
      if (!user) {
        return res.status(401).json({ error: info.message || 'Authentication failed' });
      }
  
      // Create JWT token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' } // Token expires in 1 day
      );
  
      // Set cookie (optional)
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });
  
      return res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    })(req, res, next);
  };
  
  // Logout controller
  const logoutUser = (req, res) => {
    // Clear the JWT cookie
    res.clearCookie('jwt');
    
    // If using token in header, client should remove it
    res.json({ message: 'Logout successful' });
  };
  
  // Protected route example
  const getProfile = async (req, res) => {
    try {
      // User is available in req.user from JWT strategy
      const user = await pool.query('SELECT id, username, email, role FROM users WHERE id = $1', [req.user.id]);
      res.json(user.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch profile' });
    }
  };



export { registerUser, verifyUser, loginUser, logoutUser, getProfile };