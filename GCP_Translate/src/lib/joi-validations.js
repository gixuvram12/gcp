const Joi = require('joi');

const nameSchema = Joi.string()
  .min(1)
  .max(30)
  .label('Character should be between 1 and 30 characters.');

module.exports = {nameSchema};
