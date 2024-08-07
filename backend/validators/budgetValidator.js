const Joi = require('joi');

const categoryBudgetSchema = Joi.object({
  category: Joi.string().required(),
  amount: Joi.number().positive().required(),
});

const addBudgetSchema = Joi.object({
  name: Joi.string().required(),
  totalAmount: Joi.number().positive().required(),
  categories: Joi.array().items(categoryBudgetSchema).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});

const getBudgetsSchema = Joi.object({
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  category: Joi.string().optional(),
  name: Joi.string().optional(),
});

module.exports = {
  addBudgetSchema,
  getBudgetsSchema,
};

