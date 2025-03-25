import pool from '../config/db.js';
import cron from 'node-cron';

// Runs every Sunday at midnight (00:00)
cron.schedule('0 0 * * 0', async () => {
    try {
        const result = await pool.query(`
            DELETE FROM unverified_users 
            WHERE token_expires_at < NOW()
        `);
        console.log(`Cleaned up ${result.rowCount} expired unverified users`);
    } catch (error) {
        console.error('Cleanup job failed:', error);
    }
});