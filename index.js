const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

// Create a new express application instance
const app = express();

// Database connection
dbConnection();

// Cors
app.use(cors());

// Public folder to serve static content
app.use(express.static('public'));

// Read and parse the body of the request
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// The port the express app will listen on
app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
