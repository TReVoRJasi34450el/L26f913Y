// 代码生成时间: 2025-09-24 00:39:32
// Importing required modules
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define an in-memory store for orders
let orders = [];

// Function to create a new order
function createOrder(order) {
  // Simple validation
  if (!order.customer || !order.items) {
    throw new Error('Invalid order data');
  }
  // Add order to the store
  orders.push(order);
  return order;
}

// Function to process an order
function processOrder(orderId) {
  // Find the order by ID
  const order = orders.find(o => o.id === orderId);
  if (!order) {
    throw new Error('Order not found');
  }
  // Simulate processing
  order.status = 'processed';
  return order;
}

// API endpoint to create an order
app.post('/orders', (req, res) => {
  try {
    const newOrder = createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API endpoint to process an order
app.get('/orders/:id/process', (req, res) => {
  try {
    const processedOrder = processOrder(req.params.id);
    res.json(processedOrder);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Order processing app listening at http://localhost:${port}`);
});