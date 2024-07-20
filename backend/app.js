const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/budgets', budgetRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware should be defined after all routes
app.use(errorHandler);

module.exports = app;

