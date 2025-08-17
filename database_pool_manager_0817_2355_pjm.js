// 代码生成时间: 2025-08-17 23:55:47
// Node.js + Express + Database Pool Manager
const express = require('express');
const { Pool } = require('pg');

// Database configuration
const dbConfig = {
  user: 'your_username',
  host: 'localhost',
  database: 'your_database',
  password: 'your_password',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // idle timeout in ms
  connectionTimeoutMillis: 2000 // connection timeout in ms
};

// Create a new pool instance
const pool = new Pool(dbConfig);

// Initialize Express application
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Service is up and running');
});

// Database connection pool management endpoint
app.get('/database', async (req, res) => {
  try {
    // Get a client from the pool
    const client = await pool.connect();

    // Use the client to execute a query
    const result = await client.query('SELECT NOW()');

    // Log the current time from the database
    console.log(result.rows[0].now);

    // Release the client back to the pool
    client.release();

    // Send the current time to the client
    res.status(200).json({ current_time: result.rows[0].now });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Failed to connect to the database' });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Add a shutdown hook to close the pool
process.on('SIGINT', async () => {
  await pool.end();
  process.exit(0);
});

// Export the pool for testing purposes
module.exports = pool;