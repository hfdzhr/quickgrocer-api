import { prismaClient } from '../application/database.js';
import { validate } from '../validation/validation.js';

import { ResponseError } from '../error/response-error.js';
import fs from 'fs';
import { createCartValidation } from '../validation/cart-validation.js';

const create = async (request) => {
  const cart = validate(createCartValidation, request);

  const findProduct = await prismaClient.product.findUnique({
    where: {
      id: cart.product_id,
    },
    select: {
      id: true,
      price: true,
    },
  });

  if (!findProduct) {
    throw new ResponseError(404, 'Product Not Found');
  }

  const totalPrice = cart.quantity * findProduct.price;

  const payloadCart = [
    {
      product_id: findProduct.id,
      quantity: cart.quantity,
      purchase_price: findProduct.price,
      total_price: totalPrice,
    },
  ];

  if (cart.status) {
    payloadCart.push({
      product_id: findProduct.id,
      quantity: cart.quantity,
      purchase_price: findProduct.price,
      total_price: totalPrice,
      status: cart.status,
    });
  } else {
    payloadCart.push({});
  }

  const addCartItem = await prismaClient.cartItem.create({
    data: payloadCart[0],
  });

  const createCartItem = await prismaClient.cart.create({
    data: {
      cart_item_id: addCartItem.id,
      user_id: cart.user_id,
    },
  });

  return createCartItem;
};

const get = async (request) => {
  const productId = validate(getProductValidation, request);

  prismaClient.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      brand: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          email: true,
          merchant_name: true,
        },
      },
    },
  });

  const product = await prismaClient.product.findFirst({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new ResponseError(404, 'Product Not Found');
  }

  return product;
};

const getAll = async () => {
  return prismaClient.product.findMany({
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      brand: {
        select: {
          id: true,
          name: true,
        },
      },
      user: {
        select: {
          id: true,
          email: true,
          merchant_name: true,
        },
      },
    },
  });
};

const update = async (request, file) => {
  const product = validate(updateProductValidation, request);

  const findProduct = await prismaClient.product.findUnique({
    where: {
      id: product.id,
    },
    select: {
      image_url: true,
    },
  });

  if (!findProduct) {
    throw new ResponseError(404, 'Product not found');
  }

  fs.unlinkSync(findProduct.image_url);

  product.image_url = file;

  return prismaClient.product.update({
    where: {
      id: product.id,
    },
    data: {
      name: product.name,
      sku: product.sku,
      image_url: product.image_url,
      description: product.description,
      quantity: product.quantity,
      price: product.price,
      category_id: product.category_id,
      brand_id: product.brand_id,
      user_id: product.user_id,
    },
  });
};

const remove = async (request) => {
  const productId = validate(getProductValidation, request);

  const findProduct = await prismaClient.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      image_url: true,
    },
  });

  if (!findProduct) {
    throw new ResponseError(404, 'Product Not Found');
  }

  fs.unlinkSync(findProduct.image_url);

  return prismaClient.product.delete({
    where: {
      id: productId,
    },
  });
};

export default {
  create,
  //   get,
  //   getAll,
  //   update,
  //   remove,
};
