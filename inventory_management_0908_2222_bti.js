// 代码生成时间: 2025-09-08 22:22:33
const express = require('express');
const app = express();
const port = 3000;

// Mock database for inventory items.
// In a real application, this would be replaced with a database call.
let inventory = [
  { id: 1, name: 'Item 1', quantity: 10 },
  { id: 2, name: 'Item 2', quantity: 20 },
  { id: 3, name: 'Item 3', quantity: 15 },
];

// Middleware to parse request bodies
app.use(express.json());

// Get all inventory items
app.get('/api/inventory', (req, res) => {
  try {
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a single inventory item by ID
app.get('/api/inventory/:id', (req, res) => {
  const { id } = req.params;
  const item = inventory.find(item => item.id === parseInt(id));
  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Add a new inventory item
app.post('/api/inventory', (req, res) => {
  try {
    const newItem = {
      id: inventory.length + 1, // Simple way to generate a new ID
      name: req.body.name,
      quantity: req.body.quantity,
    };
    inventory.push(newItem);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an existing inventory item
app.put('/api/inventory/:id', (req, res) => {
  const { id } = req.params;
  const itemIndex = inventory.findIndex(item => item.id === parseInt(id));
  if (itemIndex > -1) {
    inventory[itemIndex] = {
      ...inventory[itemIndex],
      name: req.body.name,
      quantity: req.body.quantity,
    };
    res.status(200).json(inventory[itemIndex]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Delete an inventory item
app.delete('/api/inventory/:id', (req, res) => {
  const { id } = req.params;
  const itemIndex = inventory.findIndex(item => item.id === parseInt(id));
  if (itemIndex > -1) {
    inventory.splice(itemIndex, 1);
    res.status(200).json({ message: 'Item deleted' });
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Inventory Management System listening at http://localhost:${port}`);
});