// 代码生成时间: 2025-08-09 05:54:08
const express = require('express');
const fs = require('fs');
const path = require('path');

// Define the port on which the server will listen
const PORT = 3000;

// Create an Express application
const app = express();

// Middleware to log request information
app.use((req, res, next) => {
  const logData = {
    method: req.method,
    url: req.url,
    body: req.body,
    timestamp: new Date().toISOString(),
  };
  // Write the log data to a file
  fs.appendFile('security_audit_log.txt', JSON.stringify(logData) + '
', (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
  next();
});

// Define a route that triggers the logging middleware
app.get('/audit', (req, res) => {
  // Respond with a message indicating the request has been logged
  res.status(200).send('Request logged for security audit.');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Security Audit Log server listening on port ${PORT}`);
});
