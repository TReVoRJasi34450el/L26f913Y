// 代码生成时间: 2025-09-24 19:30:29
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Data model
const users = [];

// Utility function to find a user by ID
function findUserById(userId) {
    return users.find(user => user.id === userId);
}

// Utility function to generate unique ID
function generateId() {
    return Math.floor(Math.random() * 10000);
}

// API endpoint to get all users
app.get('/users', (req, res) => {
    try {
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint to create a new user
app.post('/users', (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const newUser = { id: generateId(), name };
        users.push(newUser);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint to get a single user by ID
app.get('/users/:userId', (req, res) => {
    try {
        const { userId } = req.params;
        const user = findUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint to update an existing user
app.put('/users/:userId', (req, res) => {
    try {
        const { userId } = req.params;
        const { name } = req.body;
        const user = findUserById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        user.name = name;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint to delete a user
app.delete('/users/:userId', (req, res) => {
    try {
        const { userId } = req.params;
        const userIndex = users.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found' });
        }
        users.splice(userIndex, 1);
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Server configuration
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});