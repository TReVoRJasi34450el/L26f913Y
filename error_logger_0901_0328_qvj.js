// 代码生成时间: 2025-09-01 03:28:52
const fs = require('fs');
const path = require('path');
const express = require('express');

// Define the log file path
const logFilePath = path.join(__dirname, 'error.log');

// Initialize Express app
const app = express();

// Middleware to handle errors
app.use((err, req, res, next) => {
  // Log the error to the console and file
  console.error('Error:', err.message);
  fs.appendFile(logFilePath, `Error at ${new Date().toISOString()}: ${err.message}
`, (err) => {
    if (err) {
      console.error('Failed to write error to log file:', err.message);
    }
  });

  // Respond with a generic error message to the client
  res.status(500).send('An error occurred while processing your request.');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Error Logger server is running on port ${PORT}`);
});