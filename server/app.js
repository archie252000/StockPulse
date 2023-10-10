const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');

require('dotenv').config();


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const stockRoutes = require('./routes/stockRoutes');
// const alertRoutes = require('./routes/alertRoutes');
// const notificationRoutes = require('./routes/notificationRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);
// app.use('/api/alerts', alertRoutes);
// app.use('/api/notifications', notificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});



module.exports = app;