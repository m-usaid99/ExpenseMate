const express = require('express');
const router = express.Router();
const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');
const { validateQuery, validateRequest } = require('../middleware/validationMiddleware');
const { addExpenseSchema, getExpensesSchema } = require('../validators/expenseValidator');

router.route('/')
  .post(protect, validateRequest(addExpenseSchema), addExpense)
  .get(protect, validateQuery(getExpensesSchema), getExpenses);

router.route('/:id')
  .put(protect, updateExpense)
  .delete(protect, deleteExpense)

module.exports = router;
