import categoryService from '../service/category-service.js';
import { logger } from '../application/logging.js';

const create = async (req, res, next) => {
  try {
    const result = await categoryService.create(req.body.name);
    res.status(201).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const result = await categoryService.get(categoryId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await categoryService.getAll();
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const request = req.body;
    request.id = categoryId;

    console.log(request);

    const result = await categoryService.update(request);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const result = await categoryService.remove(categoryId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  get,
  getAll,
  update,
  remove,
};
