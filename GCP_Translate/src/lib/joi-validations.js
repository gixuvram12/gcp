const Joi = require('joi');

const nameSchema = Joi.string()
  .min(1)
  .max(60)
  .label('Character should be between 1 and 60 characters.');

module.exports = {nameSchema};
