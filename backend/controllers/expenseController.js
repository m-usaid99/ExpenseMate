// backend/controllers/expenseController.js
const asyncHandler = require('express-async-handler');
const Expense = require('../models/Expense');

// @desc    Add new expense
// @route   POST /api/expense
// @access  Private
const addExpense = asyncHandler(async (req, res) => {
  const { date, category, amount, tag, notes } = req.body;

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
  const expenses = await Expense.find({ user: req.user._id });
  res.json(expenses);
});

// @desc    Update expense
// @route   PUT /api/expense/:id
// @access  Private
const updateExpense = asyncHandler(async (req, res) => {
  const { date, category, amount, tag, notes } = req.body;

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

