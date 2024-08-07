const Joi = require('joi');

const addExpenseSchema = Joi.object({
  date: Joi.date().required(),
  category: Joi.string().required(),
  amount: Joi.number().positive().required(),
  tag: Joi.string().required(),
  notes: Joi.string().allow(''),
});

const getExpensesSchema = Joi.object({
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  category: Joi.string().optional(),
  minAmount: Joi.number().positive().optional(),
  maxAmount: Joi.number().positive().optional(),
  tag: Joi.string().valid('One-time', 'Monthly', 'Recurring'),
});

module.exports = {
  addExpenseSchema,
  getExpensesSchema,
};

