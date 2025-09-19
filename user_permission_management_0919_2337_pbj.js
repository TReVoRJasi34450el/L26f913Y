// 代码生成时间: 2025-09-19 23:37:14
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory user data store
const users = [];

// User model
class User {
  constructor(id, username, permissions) {
    this.id = id;
    this.username = username;
    this.permissions = permissions;
  }
}

// Helper function to find a user by username
const findUserByUsername = (username) => {
  return users.find(user => user.username === username);
};

// Endpoint to create a new user
app.post('/users', (req, res) => {
  try {
    const { username, permissions } = req.body;
    if (!username || !permissions) {
      return res.status(400).json({ error: 'Username and permissions are required' });
    }
    const newUser = new User(users.length + 1, username, permissions);
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to update user permissions
app.put('/users/:id/permissions', (req, res) => {
  try {
    const { id } = req.params;
    const { permissions } = req.body;
    const user = findUserByUsername(req.body.username);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.permissions = permissions;
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to get user data
app.get('/users/:id', (req, res) => {
  try {
    const { id } = req.params;
    const user = users.find(user => user.id === parseInt(id));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`User Permission Management System running on port ${port}`);
});

// Notes:
// - This is a simple in-memory implementation for demonstration purposes.
// - In a real-world application, you would use a database to store user data.
// - Error handling is implemented to return appropriate HTTP status codes and messages.
// - The system is designed to be easily extendable, for example, by adding more endpoints or integrating with a database.
