import productService from '../service/product-service.js';
import { logger } from '../application/logging.js';
import { ResponseError } from '../error/response-error.js';
import cartService from '../service/cart-service.js';

const create = async (req, res, next) => {
  try {
    const result = await cartService.create(req.body);
    res.status(201).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

// const get = async (req, res, next) => {
//   try {
//     const productId = req.params.productId;
//     const result = await productService.get(productId);
//     res.status(200).json({
//       data: result,
//     });
//   } catch (e) {
//     next(e);
//   }
// };

// const getAll = async (req, res, next) => {
//   try {
//     const result = await productService.getAll();
//     res.status(200).json({
//       data: result,
//     });
//   } catch (e) {
//     next(e);
//   }
// };

// const update = async (req, res, next) => {
//   try {
//     const productId = req.params.productId;

//     const request = req.body;

//     request.id = productId;

//     const result = await productService.update(request, req.file.path);

//     res.status(200).json({
//       data: result,
//     });
//   } catch (e) {
//     next(e);
//   }
// };

// const remove = async (req, res, next) => {
//   try {
//     const productId = req.params.productId;
//     const result = await productService.remove(productId);
//     res.status(200).json({
//       data: result,
//     });
//   } catch (e) {
//     next(e);
//   }
// };

export default {
  create,
  //   get,
  //   getAll,
  //   update,
  //   remove,
};
