import express from 'express';
import categoryController from '../controller/category-controller.js';
import brandController from '../controller/brand-controller.js';
import productController from '../controller/product-controller.js';
import {
  merchantAuthMiddleware,
  memberAuthMiddleware,
} from '../middleware/auth-middleware.js';

const router = new express.Router();

// Router Category
router.post(
  '/api/categories',
  merchantAuthMiddleware,
  categoryController.create
);
router.get(
  '/api/categories/:categoryId',
  merchantAuthMiddleware,
  categoryController.get
);
router.get(
  '/api/categories',
  merchantAuthMiddleware,
  categoryController.getAll
);
router.patch(
  '/api/categories/:categoryId',
  merchantAuthMiddleware,
  categoryController.update
);
router.delete(
  '/api/categories/:categoryId',
  merchantAuthMiddleware,
  categoryController.remove
);

// Router Brand
router.post('/api/brands', merchantAuthMiddleware, brandController.create);
router.get('/api/brands/:brandId', merchantAuthMiddleware, brandController.get);
router.get('/api/brands', merchantAuthMiddleware, brandController.getAll);
router.patch(
  '/api/brands/:brandId',
  merchantAuthMiddleware,
  brandController.update
);
router.delete(
  '/api/brands/:brandId',
  merchantAuthMiddleware,
  brandController.remove
);

// Router Product

export { router };
