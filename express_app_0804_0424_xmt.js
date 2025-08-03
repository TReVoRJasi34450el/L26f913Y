// 代码生成时间: 2025-08-04 04:24:19
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define a simple data model for demonstration purposes
// In a real-world application, you would use a database
const users = [];

// Function to create a new user
const createUser = (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ message: 'Username and email are required' });
  }

  const user = { id: users.length + 1, username, email };
  users.push(user);
  res.status(201).json(user);
};

// Function to get all users
const getAllUsers = (req, res) => {
  res.status(200).json(users);
};

// Function to get a user by ID
const getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
};

// Function to update a user
const updateUser = (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  const user = users.find(user => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.username = username;
  user.email = email;
  res.status(200).json(user);
};

// Function to delete a user
const deleteUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(user => user.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(index, 1);
  res.status(200).json({ message: 'User deleted' });
};

// Routes
app.post('/users', createUser);
app.get('/users', getAllUsers);
app.get('/users/:id', getUserById);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});