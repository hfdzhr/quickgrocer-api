import Joi from 'joi';

const createProductValidation = Joi.object({
  name: Joi.string().max(100).required(),
  sku: Joi.string().max(100).required(),
  description: Joi.string().required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
  category_id: Joi.number().required(),
  brand_id: Joi.number().required(),
  user_id: Joi.string().required(),
});

const getProductValidation = Joi.string().required();

const updateProductValidation = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().max(100).optional(),
  sku: Joi.string().max(100).optional(),
  image_url: Joi.string().max(50).optional(),
  description: Joi.string().optional(),
  quantity: Joi.number().optional(),
  price: Joi.number().optional(),
  category_id: Joi.number().optional(),
  brand_id: Joi.number().optional(),
  user_id: Joi.string().optional(),
});

const searchProductValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  name: Joi.string().max(100).required(),
});

export {
  createProductValidation,
  getProductValidation,
  updateProductValidation,
  searchProductValidation,
};
