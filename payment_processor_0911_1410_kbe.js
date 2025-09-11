// 代码生成时间: 2025-09-11 14:10:32
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mock payment processing function
const processPayment = (amount) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate payment processing
      if (Math.random() > 0.2) {
        resolve({ status: 'success', message: 'Payment processed successfully' });
      } else {
        reject({ status: 'error', message: 'Payment failed' });
      }
    }, 1000);
  });
};

// Payment route
app.post('/pay', async (req, res) => {
  try {
    // Validate input
    const { amount } = req.body;
    if (!amount || typeof amount !== 'number') {
      return res.status(400).json({
        error: 'Invalid amount',
        message: 'Amount must be a number'
      });
    }

    // Process payment
    const result = await processPayment(amount);
    res.status(200).json({
      status: result.status,
      message: result.message
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      error: 'Payment processing error',
      message: error.message
    });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Payment processor running on port ${port}`);
});