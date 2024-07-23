const express = require('express');
const router = express.Router();

const {
  addIncome,
  getIncomes,
  updateIncome,
  deleteIncome
} = require('../controllers/incomeController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, addIncome).get(protect, getIncomes);
router.route('/:id').put(protect, updateIncome).delete(protect, deleteIncome);

module.exports = router;
