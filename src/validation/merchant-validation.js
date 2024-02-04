import Joi from 'joi';

const registerMerchantValidation = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().max(100).required(),
  full_name: Joi.string().max(100).required(),
  merchant_name: Joi.string().max(100).required(),
  phone_number: Joi.string().max(20).required(),
});

const loginMerchantValidation = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().max(100).required(),
});

const getMerchantValidation = Joi.string().email().max(100).required();

const updateMerchantValidation = Joi.object({
  password: Joi.string().max(100).optional(),
  full_name: Joi.string().max(100).optional(),
  merchant_name: Joi.string().max(100).required(),
  phone_number: Joi.string().max(20).optional(),
});

export {
  registerMerchantValidation,
  loginMerchantValidation,
  getMerchantValidation,
  updateMerchantValidation,
};
