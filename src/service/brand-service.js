import { prismaClient } from '../application/database.js';
import { validate } from '../validation/validation.js';
import {
  getBrandValidation,
  updateBrandValidation,
  createBrandValidation,
} from '../validation/brand-validation.js';
import { ResponseError } from '../error/response-error.js';

const create = async (request) => {
  const brandName = validate(createBrandValidation, request);

  const countBrandName = await prismaClient.brand.count({
    where: {
      name: brandName,
    },
  });

  if (countBrandName === 1) {
    throw new ResponseError(409, 'Brand already exists');
  }
  
  return prismaClient.brand.create({
    data: {
      name: brandName,
    },
    select: {
      id: true,
      name: true,
    },
  });
};

const get = async (request) => {
  const brandId = validate(getBrandValidation, request);

  const brand = await prismaClient.brand.findFirst({
    where: {
      id: brandId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!brand) {
    throw new ResponseError(404, 'Brand is not found');
  }

  return brand;
};

const getAll = async () => {
  return prismaClient.brand.findMany({
    select: {
      id: true,
      name: true,
    },
  });
};

const update = async (request) => {
  const brand = validate(updateBrandValidation, request);

  const totalBrandInDatabase = await prismaClient.brand.count({
    where: {
      id: brand.id,
    },
  });

  if (totalBrandInDatabase !== 1) {
    throw new ResponseError(404, 'Brand is not found');
  }

  return prismaClient.brand.update({
    where: {
      id: brand.id,
    },
    data: {
      name: brand.name,
    },
    select: {
      id: true,
      name: true,
    },
  });
};

const remove = async (request) => {
  const brandId = validate(getBrandValidation, request);

  const totalInDatabase = await prismaClient.brand.count({
    where: {
      id: brandId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, 'Brand is not found');
  }

  return prismaClient.brand.delete({
    where: {
      id: brandId,
    },
    select: {
      id: true,
      name: true,
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
