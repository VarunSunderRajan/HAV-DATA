// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3002; // Use the port from the environment variable or 3001

app.use(cors()); // Enable CORS for all routes

// Import routes
const routes = require('./routes'); // Make sure the path is correct

// Use the routes
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// Path: Full-Stack/Dashboard/Backend/routes.js