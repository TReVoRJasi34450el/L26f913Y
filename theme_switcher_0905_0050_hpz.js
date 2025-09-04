// 代码生成时间: 2025-09-05 00:50:28
const express = require('express');
const app = express();
const port = 3000;

// Define themes
const themes = {
  'light': 'Light Theme',
  'dark': 'Dark Theme',
  'colorful': 'Colorful Theme'
};

// Middleware to parse request body
app.use(express.json());

// Route to switch themes
app.get('/api/switch-theme', (req, res) => {
  const { theme } = req.query;

  // Check if the theme is valid
  if (!themes.hasOwnProperty(theme)) {
    return res.status(400).json({
      error: "Invalid theme. Please choose from 'light', 'dark', or 'colorful'."
    });
  }

  // Set the theme in the session (or localStorage in a client-side application)
  // For this example, we'll just send back the chosen theme
  res.json({
    message: "Theme switched successfully",
    theme: themes[theme]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Theme Switcher app listening at http://localhost:${port}`);
});