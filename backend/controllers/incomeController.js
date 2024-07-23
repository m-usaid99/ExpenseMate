const asyncHandler = require('express-async-handler');
const Income = require('../models/Income');

// @desc    Add new Income
// @route   POST /api/income
// @access  Private
const addIncome = asyncHandler(async (req, res) => {
  const { date, category, amount, tag, notes } = req.body;

  if (!date || !category || !amount || !tag || isNaN(amount) || amount < 0) {
    res.status(400);
    throw new Error('Date, category, amount, and tag are required');
  };

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

// @desc    Get incomes 
// @route   GET /api/income/:id 
// @access  Private
const getIncomes = asyncHandler(async (req, res) => {
  const incomes = await Income.find({ user: req.user._id });
  res.json(incomes);
});

// @desc    Update income
// @route   PUT /api/income/:id
// @access  Private
const updateIncome = asyncHandler(async (req, res) => {
  const { date, category, amount, tag, notes } = req.body;

  if (!date || !category || !amount || !tag || isNaN(amount) || amount < 0) {
    res.status(400);
    throw new Error('Invalid data');
  }

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
    await income.deleteOne();
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


