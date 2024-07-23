const express = require('express');
const router = express.Router();
const {
  addBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
} = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');
const { validateQuery, validateRequest } = require('../middleware/validationMiddleware');
const { addBudgetSchema, getBudgetsSchema } = require('../validators/budgetValidator');

router.route('/')
  .post(protect, validateRequest(addBudgetSchema), addBudget)
  .get(protect, validateQuery(getBudgetsSchema), getBudgets);

router.route('/:id')
  .put(protect, updateBudget)
  .delete(protect, deleteBudget);

module.exports = router;

