// 代码生成时间: 2025-09-08 14:34:01
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to analyze data
app.post('/analyze', (req, res) => {
  // Error handling for missing data in request body
  if (!req.body || !req.body.data) {
    return res.status(400).json({
      error: 'Missing data in request body'
    });
  }

  const { data } = req.body;
  // Assuming data is an array of numbers
  let total = 0;
  let count = data.length;
  let min = data[0];
  let max = data[0];
  let sumOfSquares = 0;

  // Process each data point
  data.forEach((value) => {
    total += value;
    if (value < min) {
      min = value;
    }
    if (value > max) {
      max = value;
    }
    sumOfSquares += value * value;
  });

  // Calculate mean, variance, and standard deviation
  const mean = total / count;
  const variance = (sumOfSquares - (total * total) / count) / (count - 1);
  const stdDeviation = Math.sqrt(variance);

  // Return analysis results
  res.json({
    mean,
    min,
    max,
    variance,
    stdDeviation
  });
});

// Error handling for non-existing routes
app.use((req, res) => {
  res.status(404).send('404: Route not found');
});

// Start the server
app.listen(port, () => {
  console.log(`Data analysis server running on port ${port}`);
});
