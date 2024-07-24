// backend/controllers/expenseController.js
const asyncHandler = require('express-async-handler');
const Expense = require('../models/Expense');

// @desc    Add new expense
// @route   POST /api/expense
// @access  Private
const addExpense = asyncHandler(async (req, res) => {
  const { date, category, amount, tag, notes } = req.body;

  if (!date || !category || !amount || !tag) {
    res.status(400);
    throw new Error('Date, category, amount, and tag are required');
  }

  const expense = new Expense({
    user: req.user._id,
    date,
    category,
    amount,
    tag,
    notes,
  });

  const createdExpense = await expense.save();
  res.status(201).json(createdExpense);
});

// @desc    Get all expenses
// @route   GET /api/expense
// @access  Private
const getExpenses = asyncHandler(async (req, res) => {
  const { category, startDate, endDate, minAmount, maxAmount, tag } = req.query;

  const query = { user: req.user._id };

  if (category) {
    query.category = category;
  }

  if (startDate || endDate) {
    query.date = {};
    if (startDate) {
      query.date.$gte = new Date(startDate);
    }
    if (endDate) {
      query.date.$lte = new Date(endDate);
    }
  }

  if (minAmount || maxAmount) {
    query.amount = {};
    if (minAmount) {
      query.amount.$gte = Number(minAmount);
    }
    if (maxAmount) {
      query.amount.$lte = Number(maxAmount);
    }
  }

  if (tag) {
    query.tag = tag;
  }

  const expenses = await Expense.find(query);
  res.json(expenses);
});

// @desc    Update expense
// @route   PUT /api/expense/:id
// @access  Private
const updateExpense = asyncHandler(async (req, res) => {
  const { date, category, amount, tag, notes } = req.body;
  if (!date || !category || !tag || isNaN(amount) || amount < 0) {
    res.status(400);
    throw new Error('Invalid data');
  }

  const expense = await Expense.findById(req.params.id);

  if (expense) {
    expense.date = date || expense.date;
    expense.category = category || expense.category;
    expense.amount = amount || expense.amount;
    expense.tag = tag || expense.tag;
    expense.notes = notes || expense.notes;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } else {
    res.status(404);
    throw new Error('Expense not found');
  }
});

// @desc    Delete expense
// @route   DELETE /api/expense/:id
// @access  Private
const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);

  if (expense) {
    await expense.deleteOne();
    res.json({ message: 'Expense removed' });
  } else {
    res.status(404);
    throw new Error('Expense not found');
  }
});

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};

