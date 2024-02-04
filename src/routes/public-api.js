import express from 'express';
import userController from '../controller/user-controller.js';
import merchantController from '../controller/merchant-controller.js';
import productController from '../controller/product-controller.js';
import cartController from '../controller/cart-controller.js';

const publicRouter = new express.Router();

publicRouter.post('/api/users', userController.register);
publicRouter.post('/api/users/login', userController.login);
publicRouter.post('/api/users/:userId', userController.get);

publicRouter.post('/api/merchants', merchantController.register);
publicRouter.post('/api/merchants/login', merchantController.login);

publicRouter.get('/api/products/:productId', productController.get);
publicRouter.get('/api/products', productController.getAll);
publicRouter.post('/api/products', productController.create);
publicRouter.delete('/api/products/:productId', productController.remove);
publicRouter.patch('/api/products/:productId', productController.update);

publicRouter.post('/api/carts', cartController.create);
export { publicRouter };
