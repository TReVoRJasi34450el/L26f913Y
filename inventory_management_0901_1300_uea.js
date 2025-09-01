// 代码生成时间: 2025-09-01 13:00:27
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data to simulate a database
let inventoryItems = [{
  id: 1,
  name: 'Laptop',
  quantity: 10,
  price: 999.99
}, {
  id: 2,
  name: 'Smartphone',
# TODO: 优化性能
  quantity: 20,
  price: 499.99
}];

// Helper function to find an item by ID
const findItemById = (id) => {
  return inventoryItems.find(item => item.id === id);
};

// Helper function to update an item in the inventory
const updateItemInInventory = (updatedItem) => {
  const index = inventoryItems.findIndex(item => item.id === updatedItem.id);
  if (index !== -1) {
    inventoryItems[index] = updatedItem;
  }
  return index !== -1 ? true : false;
};

// Helper function to delete an item from the inventory
const deleteItemFromInventory = (id) => {
  const index = inventoryItems.findIndex(item => item.id === id);
  if (index !== -1) {
# 增强安全性
    inventoryItems.splice(index, 1);
  }
# 添加错误处理
  return index !== -1 ? true : false;
};

// GET endpoint to retrieve all inventory items
app.get('/inventory', (req, res) => {
  res.status(200).json(inventoryItems);
});

// POST endpoint to add a new inventory item
app.post('/inventory', (req, res) => {
  const { name, quantity, price } = req.body;
  if (!name || !quantity || !price) {
    return res.status(400).json({
      message: 'Missing required fields: name, quantity, price'
    });
  }
  const newItemId = inventoryItems.length + 1;
  inventoryItems.push({
# 改进用户体验
    id: newItemId,
    name: name,
    quantity: quantity,
    price: price
  });
# 改进用户体验
  res.status(201).json({
    message: 'Item added successfully',
    item: inventoryItems[inventoryItems.length - 1]
# 改进用户体验
  });
});

// PUT endpoint to update an existing inventory item
app.put('/inventory/:id', (req, res) => {
  const { name, quantity, price } = req.body;  const { id } = req.params;
# 优化算法效率
  const item = findItemById(id);
  if (!item) {
    return res.status(404).json({
      message: 'Item not found'
# 优化算法效率
    });
  }
  const updatedItem = {
    id: parseInt(id),
    name: name,
    quantity: quantity,
# TODO: 优化性能
    price: price
  };
  if (updateItemInInventory(updatedItem)) {
    res.status(200).json({
      message: 'Item updated successfully',
      item: updatedItem
    });
  } else {
    res.status(500).json({
      message: 'Failed to update item'
    });
  }
});

// DELETE endpoint to remove an inventory item
app.delete('/inventory/:id', (req, res) => {
  const { id } = req.params;
  const item = findItemById(id);
  if (!item) {
    return res.status(404).json({
      message: 'Item not found'
    });
  }
  if (deleteItemFromInventory(id)) {
    res.status(200).json({
      message: 'Item deleted successfully'
    });
  } else {
    res.status(500).json({
      message: 'Failed to delete item'
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Inventory Management System listening at http://localhost:${port}`);
});