const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
app.use('/api/users', userRoutes);
app.use('/api/expense', expenseRoutes);

// Error Handling Middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

module.exports = app;

