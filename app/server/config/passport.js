import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import pool from './db.js';
import bcrypt from 'bcryptjs';

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Use email as username
    },
    async (email, password, done) => {
      try {
        // Search for the user in db
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
          return done(null, false, { message: 'Usuario no encontrado' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
          return done(null, false, { message: 'Contraseña incorrecta' });
        }

        return done(null, user.rows[0]);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, user.rows[0]);
  } catch (error) {
    done(error);
  }
});