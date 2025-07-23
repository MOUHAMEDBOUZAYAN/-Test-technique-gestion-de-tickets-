const Joi = require('joi');

const validateRegister = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });

  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  return schema.validate(data);
};

const validateTicket = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    description: Joi.string().max(1000).required(),
    status: Joi.string().valid('todo', 'in_progress', 'done').optional(),
    priority: Joi.string().valid('low', 'medium', 'high').optional()
  });

  return schema.validate(data);
};

const validateTicketUpdate = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(200).optional(),
    description: Joi.string().max(1000).optional(),
    status: Joi.string().valid('todo', 'in_progress', 'done').optional(),
    priority: Joi.string().valid('low', 'medium', 'high').optional()
  });

  return schema.validate(data);
};

module.exports = {
  validateRegister,
  validateLogin,
  validateTicket,
  validateTicketUpdate
};