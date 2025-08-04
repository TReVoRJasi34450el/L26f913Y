// 代码生成时间: 2025-08-05 04:58:47
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data to simulate database
const orders = [];

// Function to generate a unique order ID
function generateOrderId() {
  return `ORD-${Math.random().toString(36).substr(2, 9)}`;
}

// POST endpoint to create a new order
app.post('/orders', (req, res) => {
  try {
    // Validate request body
    if (!req.body.details || typeof req.body.details !== 'object') {
      return res.status(400).send('Invalid order details');
    }

    // Create a new order with a unique ID
    const newOrder = {
      id: generateOrderId(),
      ...req.body.details
    };

    // Add the new order to the orders array (simulate database save)
    orders.push(newOrder);

    // Send a success response
    res.status(201).json(newOrder);
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).send('Error creating order');
  }
});

// GET endpoint to retrieve all orders
app.get('/orders', (req, res) => {
  res.status(200).json(orders);
});

// GET endpoint to retrieve a single order by ID
app.get('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const order = orders.find(o => o.id === orderId);

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).send('Order not found');
  }
});

// PUT endpoint to update an existing order
app.put('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const orderIndex = orders.findIndex(o => o.id === orderId);

  if (orderIndex === -1) {
    res.status(404).send('Order not found');
  } else {
    try {
      // Update the order details
      orders[orderIndex] = {
        ...orders[orderIndex],
        ...req.body.details
      };

      // Send a success response with the updated order
      res.status(200).json(orders[orderIndex]);
    } catch (error) {
      // Handle any unexpected errors
      res.status(500).send('Error updating order');
    }
  }
});

// DELETE endpoint to delete an existing order
app.delete('/orders/:id', (req, res) => {
  const orderId = req.params.id;
  const orderIndex = orders.findIndex(o => o.id === orderId);

  if (orderIndex === -1) {
    res.status(404).send('Order not found');
  } else {
    // Remove the order from the orders array
    orders.splice(orderIndex, 1);

    // Send a success response
    res.status(200).send('Order deleted');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Order processing app listening at http://localhost:${port}`);
});