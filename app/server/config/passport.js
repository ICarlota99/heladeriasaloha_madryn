import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import pool from './db.js';
import bcrypt from 'bcryptjs';

// Configure local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Use email as username field
    },
    async (email, password, done) => {
      try {
        // Search for the user in db
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

        //If no user is found, return an error
        if (user.rows.length === 0) {
          return done(null, false, { message: 'Usuario no encontrado' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.rows[0].password);

        // If passwords don't match, return an error
        if (!isMatch) {
          return done(null, false, { message: 'Contraseña incorrecta' });
        }
         // If everything is correct, return the user object
        return done(null, user.rows[0]);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize the user (store the user ID in the session)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//  Deserialize the user (retrieve the user object from the session using the ID)
passport.deserializeUser(async (id, done) => {
  try {
    // Find the user in the database by ID
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    done(null, user.rows[0]);
  } catch (error) {
    // If there's an error, pass it to Passport
    done(error);
  }
});