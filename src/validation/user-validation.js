import Joi from 'joi';

const registerUserValidation = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().max(100).required(),
  full_name: Joi.string().max(100).required(),
  phone_number: Joi.string().max(20).required(),
});

const loginUserValidation = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().max(100).required(),
});

const getUserValidation = Joi.string().required();

const updateUserValidation = Joi.object({
  password: Joi.string().max(100).optional(),
  full_name: Joi.string().max(100).optional(),
  phone_number: Joi.string().max(20).optional(),
});

export {
  registerUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserValidation,
};
