const asyncHandler = require('express-async-handler');
const Income = require('../models/Income');
const { Error } = require('mongoose');

// @desc    Add new Income
// @route   POST /api/income
// @access  Private
const addIncome = asyncHandler(async (req, res) => {
  const { date, category, amount, tag, notes } = req.body;

  const income = new Income({
    user: req.user._id,
    date,
    category,
    amount,
    tag,
    notes,
  });

  const createdIncome = await income.save();
  res.status(201).json(createdIncome);
});

// @desc    Update income
// @route   PUT /api/income/:id
// @access  Private
const getIncomes = asyncHandler(async (req, res) => {
  const incomes = await Income.find({ user: req.user_id });
  res.json(incomes);
});

// @desc    Update income
// @route   PUT /api/income/:id
// @access  Private
const updateIncome = asyncHandler(async (req, res) => {
  const { date, category, amount, tag, notes } = req.body;

  const income = await Income.findById(req.params.id);

  if (income) {
    income.date = date || income.date;
    income.category = category || income.category;
    income.amount = amount || income.amount;
    income.tag = tag || income.tag;
    income.notes = notes || income.notes;

    const updatedIncome = await income.save();
    res.json(updatedIncome);
  } else {
    res.status(404);
    throw new Error('Income not found');
  }
});

// @desc    Delete income
// @route   DELETE /api/income/:id
// @access  Private
const deleteIncome = asyncHandler(async (req, res) => {
  const income = await Income.findById(req.params.id);
  if (income) {
    await income.remove();
    res.json({ message: 'Income removed' });
  } else {
    res.status(404);
    throw new Error('Income not found');
  }
});

module.exports = {
  addIncome,
  getIncomes,
  updateIncome,
  deleteIncome,
}


