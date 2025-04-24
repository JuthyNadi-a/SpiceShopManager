// Database connection
const { Pool } = require('pg');

// Use environment variables for connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Export for use in other files
module.exports = {
  query: (text, params) => pool.query(text, params),
};