import express from 'express';
import userRoutes from '../modules/user/user.route.js';
import categoryRoutes from '../modules/category/category.route.js';
import productRoutes from '../modules/product/product.route.js';

const route = express.Router();

route.use('/auth', userRoutes);
route.use('/category', categoryRoutes);
route.use('/product', productRoutes);

export default route;
