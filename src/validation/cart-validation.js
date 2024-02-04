import Joi from 'joi';

const createCartValidation = Joi.object({
  user_id: Joi.string().required(),
  product_id: Joi.string().required(),
  quantity: Joi.number().required(),
  status: Joi.string().optional(),
});
// const updateBrandValidation = Joi.object({
//   id: Joi.number().required(),
//   name: Joi.string().max(100).required(),
// });

// const getBrandValidation = Joi.number().required();

export { createCartValidation };
