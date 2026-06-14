import express from 'express';
import { CreateCategory, GetAllCategories } from './category.controller.js';
import { auth } from '../../middlewares/auth.middleware.js';

const route = express.Router();

route.post('/create', CreateCategory);
route.get('/get-all-categories', GetAllCategories);

export default route;
