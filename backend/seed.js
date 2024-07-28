const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Expense = require('./models/Expense');
const Income = require('./models/Income');

mongoose.connect(process.env.MONGO_URI, {
});

const seedDB = async () => {
  await User.deleteMany({});
  await Expense.deleteMany({});
  await Income.deleteMany({});


  const user = new User({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    isAdmin: false,
    settings: {
      theme: 'light',
      currency: 'USD',
      notifications: false,
    },
  });

  await user.save();

  const expenses = [
    { date: new Date(), category: 'Food', amount: 10, tag: 'one-time', notes: 'Lunch' },
    { date: new Date(), category: 'Transport', amount: 20, tag: 'one-time', notes: 'Bus fare' },
    { date: new Date(), category: 'Entertainment', amount: 50, tag: 'one-time', notes: 'Movie tickets' },
    { date: new Date(), category: 'Utilities', amount: 100, tag: 'monthly', notes: 'Electricity bill' },
    { date: new Date(), category: 'Groceries', amount: 30, tag: 'monthly', notes: 'Grocery shopping' },
    { date: new Date(), category: 'Health', amount: 200, tag: 'one-time', notes: 'Doctor visit' },
    { date: new Date(), category: 'Food', amount: 15, tag: 'one-time', notes: 'Dinner' },
    { date: new Date(), category: 'Transport', amount: 25, tag: 'one-time', notes: 'Taxi fare' },
    { date: new Date(), category: 'Entertainment', amount: 60, tag: 'one-time', notes: 'Concert tickets' },
    { date: new Date(), category: 'Utilities', amount: 120, tag: 'monthly', notes: 'Water bill' },
    { date: new Date(), category: 'Groceries', amount: 40, tag: 'monthly', notes: 'Grocery shopping' },
    { date: new Date(), category: 'Health', amount: 250, tag: 'one-time', notes: 'Dentist visit' },
    { date: new Date(), category: 'Food', amount: 20, tag: 'one-time', notes: 'Breakfast' },
    { date: new Date(), category: 'Transport', amount: 30, tag: 'one-time', notes: 'Train fare' },
    { date: new Date(), category: 'Entertainment', amount: 70, tag: 'one-time', notes: 'Theater tickets' },
  ];

  const incomes = [
    { date: new Date(), category: 'Salary', amount: 2000, tag: 'monthly', notes: 'Monthly salary' },
    { date: new Date(), category: 'Freelance', amount: 500, tag: 'one-time', notes: 'Freelance project' },
    { date: new Date(), category: 'Investment', amount: 300, tag: 'quarterly', notes: 'Stock dividends' },
    { date: new Date(), category: 'Salary', amount: 2100, tag: 'monthly', notes: 'Monthly salary' },
    { date: new Date(), category: 'Freelance', amount: 600, tag: 'one-time', notes: 'Freelance project' },
    { date: new Date(), category: 'Investment', amount: 350, tag: 'quarterly', notes: 'Stock dividends' },
    { date: new Date(), category: 'Salary', amount: 2200, tag: 'monthly', notes: 'Monthly salary' },
    { date: new Date(), category: 'Freelance', amount: 700, tag: 'one-time', notes: 'Freelance project' },
    { date: new Date(), category: 'Investment', amount: 400, tag: 'quarterly', notes: 'Stock dividends' },
  ];

  for (const expense of expenses) {
    const newExpense = new Expense({
      user: user._id,
      ...expense,
    });
    await newExpense.save();
  }

  for (const income of incomes) {
    const newIncome = new Income({
      user: user._id,
      ...income,
    });
    await newIncome.save();
  }

  console.log('Database seeded!');
  mongoose.connection.close();
};

seedDB();

