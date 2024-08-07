const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Expense = require('./models/Expense');
const Income = require('./models/Income');

mongoose.connect(process.env.MONGO_URI, {
});

const expenseCategories = [
  "Food",
  "Rent",
  "Utilities",
  "Transportation",
  "Entertainment",
  "Healthcare",
  "Education",
  "Commute",
  "Insurance",
  "Shopping",
  "Travel",
  "Grocery",
  "Miscellaneous",
];

const incomeCategories = [
  "Salary",
  "Investment",
  "Freelance",
  "Other",
];

const expenseTags = ["one-time", "monthly", "recurring"];
const incomeTags = ["one-time", "monthly", "quarterly"];

const getRandomDate = () => {
  const now = new Date();
  const pastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  return new Date(pastYear.getTime() + Math.random() * (now.getTime() - pastYear.getTime()));
};

const getRandomCategory = (type) => {
  if (type === 'expense') {
    return expenseCategories[Math.floor(Math.random() * expenseCategories.length)];
  } else {
    return incomeCategories[Math.floor(Math.random() * incomeCategories.length)];

  }
};

const getRandomExpenseTag = () => {
  return expenseTags[Math.floor(Math.random() * expenseTags.length)];
};

const getRandomIncomeTag = () => {
  return incomeTags[Math.floor(Math.random() * incomeTags.length)];
};

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

  const expenses = Array.from({ length: 20 }).map(() => ({
    date: getRandomDate(),
    category: getRandomCategory('expense'),
    amount: Math.floor(Math.random() * 500) + 1,
    tag: getRandomExpenseTag(),
    notes: 'Seeded expense',
  }));

  const incomes = Array.from({ length: 15 }).map(() => ({
    date: getRandomDate(),
    category: getRandomCategory('income'),
    amount: Math.floor(Math.random() * 3000) + 1000,
    tag: getRandomIncomeTag(),
    notes: 'Seeded income',
  }));

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

