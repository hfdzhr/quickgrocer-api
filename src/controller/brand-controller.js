import brandService from '../service/brand-service.js';
import { logger } from '../application/logging.js';

const create = async (req, res, next) => {
  try {
    const result = await brandService.create(req.body.name);
    res.status(201).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const brandId = req.params.brandId;
    const result = await brandService.get(brandId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await brandService.getAll();
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const brandId = req.params.brandId;
    const request = req.body;
    request.id = brandId;

    console.log(request);

    const result = await brandService.update(request);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const brandId = req.params.brandId;
    const result = await brandService.remove(brandId);
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
