const express = require('express');
const router = express.Router();

const {
  addIncome,
  getIncomes,
  updateIncome,
  deleteIncome
} = require('../controllers/incomeController');
const { addIncomeSchema, getIncomesSchema } = require('../validators/incomeValidator');
const { validateRequest, validateQuery } = require('../middleware/validationMiddleware');

const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, validateRequest(addIncomeSchema), addIncome).get(protect, validateQuery(getIncomesSchema), getIncomes);
router.route('/:id').put(protect, updateIncome).delete(protect, deleteIncome);

module.exports = router;
