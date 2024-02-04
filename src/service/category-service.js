import { prismaClient } from '../application/database.js';
import { validate } from '../validation/validation.js';
import {
  getCategoryValidation,
  updateCategoryValidation,
  createCategoryValidation,
} from '../validation/category-validation.js';
import { ResponseError } from '../error/response-error.js';

const create = async (request) => {
  const categoryName = validate(createCategoryValidation, request);

  const countCategoryName = await prismaClient.category.count({
    where: {
      name: categoryName,
    },
  });

  if (countCategoryName === 1) {
    throw new ResponseError(409, 'Category already exists');
  }

  return prismaClient.category.create({
    data: {
      name: categoryName,
    },
  });
};

const get = async (request) => {
  const categoryId = validate(getCategoryValidation, request);

  const category = await prismaClient.category.findFirst({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    throw new ResponseError(404, 'Category is not found');
  }

  return category;
};

const getAll = async () => {
  return prismaClient.category.findMany({});
};

const update = async (request) => {
  const category = validate(updateCategoryValidation, request);

  const totalCategoryInDatabase = await prismaClient.category.count({
    where: {
      id: category.id,
    },
  });

  if (totalCategoryInDatabase !== 1) {
    throw new ResponseError(404, 'Category is not found');
  }

  return prismaClient.category.update({
    where: {
      id: category.id,
    },
    data: {
      name: category.name,
    },
  });
};

const remove = async (request) => {
  const categoryId = validate(getCategoryValidation, request);

  const totalInDatabase = await prismaClient.category.count({
    where: {
      id: categoryId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, 'Category is not found');
  }

  return prismaClient.category.delete({
    where: {
      id: categoryId,
    },
  });
};

export default {
  create,
  get,
  getAll,
  update,
  remove,
};
