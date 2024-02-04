import Joi from 'joi';

const createBrandValidation = Joi.string().max(100).required();

const updateBrandValidation = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().max(100).required(),
});

const getBrandValidation = Joi.number().required();

export { createBrandValidation, updateBrandValidation, getBrandValidation };
