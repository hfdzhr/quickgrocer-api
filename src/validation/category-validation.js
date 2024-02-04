import Joi from 'joi';

const createCategoryValidation = Joi.string().max(100).required();

const updateCategoryValidation = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().max(100).required(),
});

const getCategoryValidation = Joi.number().required();

export {
  createCategoryValidation,
  updateCategoryValidation,
  getCategoryValidation,
};
