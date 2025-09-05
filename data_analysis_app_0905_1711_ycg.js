// 代码生成时间: 2025-09-05 17:11:09
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request body
app.use(express.json());

// Function to calculate mean
function calculateMean(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error('Input must be a non-empty array of numbers');
  }
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return sum / numbers.length;
}

// Function to calculate median
function calculateMedian(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error('Input must be a non-empty array of numbers');
  }
  const sorted = numbers.slice().sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

// Function to calculate mode
function calculateMode(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error('Input must be a non-empty array of numbers');
  }
  const counts = numbers.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
  let maxCount = 0;
  let modes = [];
  for (let num in counts) {
    if (counts[num] > maxCount) {
      maxCount = counts[num];
      modes = [Number(num)];
    } else if (counts[num] === maxCount) {
      modes.push(Number(num));
    }
  }
  return modes;
}

// API endpoint to perform data analysis
app.post('/analyze', (req, res) => {
  try {
    const { numbers } = req.body;
    const mean = calculateMean(numbers);
    const median = calculateMedian(numbers);
    const mode = calculateMode(numbers);
    
    res.status(200).json({
      mean: mean,
      median: median,
      mode: mode
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Data analysis app listening at http://localhost:${port}`);
});