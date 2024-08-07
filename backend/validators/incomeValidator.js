const Joi = require('joi');

const addIncomeSchema = Joi.object({
  date: Joi.date().required(),
  category: Joi.string().required(),
  amount: Joi.number().positive().required(),
  tag: Joi.string().required(),
  notes: Joi.string().allow(''),
});

const getIncomesSchema = Joi.object({
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  category: Joi.string().optional(),
  minAmount: Joi.number().positive().optional(),
  maxAmount: Joi.number().positive().optional(),
});

module.exports = {
  addIncomeSchema,
  getIncomesSchema,
};

