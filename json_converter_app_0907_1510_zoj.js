// 代码生成时间: 2025-09-07 15:10:40
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to handle errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).json({ error: 'Invalid JSON' });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST route to handle JSON conversion
app.post('/convert', (req, res) => {
  // Check if the body contains the 'data' key
  if (!req.body.data) {
    return res.status(400).json({ error: 'Missing data key in request body' });
  }

  try {
    // Attempt to parse the JSON data
    const parsedData = JSON.parse(req.body.data);
    // If the JSON is valid, respond with the parsed data
    res.json({ original: req.body.data, parsed: parsedData });
  } catch (error) {
    // If there's an error parsing the JSON, respond with an error message
    res.status(400).json({ error: 'Failed to parse JSON' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`JSON Converter App listening at http://localhost:${port}`);
});