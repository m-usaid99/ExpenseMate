const asyncHandler = require('express-async-handler');
const Budget = require('../models/Budget');

// @desc    Add a new budget
// @route   POST /api/budgets
// @access  Private
const addBudget = asyncHandler(async (req, res) => {
  const { name, totalAmount, categories, startDate, endDate } = req.body;

  const budget = new Budget({
    user: req.user._id,
    name,
    totalAmount,
    categories,
    startDate,
    endDate,
  });

  const createdBudget = await budget.save();
  res.status(201).json(createdBudget);
});

// @desc    Get all budgets
// @route   GET /api/budgets
// @access  Private
const getBudgets = asyncHandler(async (req, res) => {
  const { startDate, endDate, category, name } = req.query;
  const query = { user: req.user._id };

  if (startDate) {
    query.startDate = { ...query.startDate, $gte: new Date(startDate) };
  }
  if (endDate) {
    query.endDate = { ...query.endDate, $lte: new Date(endDate) };
  }
  if (category) {
    query.categories = { $elemMatch: { category } };
  }
  if (name) {
    query.name = name;
  }

  const budgets = await Budget.find(query);
  res.json(budgets);
});


// @desc    Update budget
// @route   PUT /api/budgets/:id
// @access  Private
const updateBudget = asyncHandler(async (req, res) => {
  const { name, totalAmount, categories, startDate, endDate } = req.body;
  const budget = await Budget.findById(req.params.id);

  if (budget) {
    budget.name = name || budget.name;
    budget.totalAmount = totalAmount || budget.totalAmount;
    budget.categories = categories || budget.categories;
    budget.startDate = startDate || budget.startDate;
    budget.endDate = endDate || budget.endDate;

    const updatedBudget = await budget.save();
    res.json(updatedBudget);
  } else {
    res.status(404);
    throw new Error('Budget not found');
  }
});


// @desc    Delete budget
// @route   DELETE /api/budgets/:id
// @access  Private
const deleteBudget = asyncHandler(async (req, res) => {
  const budget = await Budget.findById(req.params.id);
  if (budget) {
    await budget.deleteOne();
    res.json({ message: 'Budget removed' });
  } else {
    res.status(404);
    throw new Error('Budget not found');
  }
});

module.exports = {
  addBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
};
