// 代码生成时间: 2025-09-18 03:23:32
const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

// Middleware to parse request body
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Get process list
app.get('/processes', (req, res) => {
  exec('ps aux', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      return res.status(500).json({ error: stderr });
    }
    res.status(200).json({ processes: stdout });
  });
});

// Start a process
app.post('/start-process', (req, res) => {
  const { command } = req.body;
  if (!command) {
    return res.status(400).json({ error: 'Command is required' });
  }
  const process = exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      return res.status(500).json({ error: stderr });
    }
    res.status(200).json({ stdout });
  });
  // Send the process ID in the response
  res.status(202).json({ pid: process.pid });
});

// Stop a process
app.post('/stop-process', (req, res) => {
  const { pid } = req.body;
  if (!pid) {
    return res.status(400).json({ error: 'PID is required' });
  }
  try {
    process.kill(pid);
    res.status(200).json({ message: 'Process stopped successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Process Manager app listening at http://localhost:${port}`);
});