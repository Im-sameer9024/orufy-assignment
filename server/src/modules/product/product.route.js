import express from 'express';
import { createProductSchema, updateProductSchema } from './product.validationSchema.js';
import { upload } from '../../middlewares/multer.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import {
  CreateProduct,
  GetAllProducts,
  UpdateProduct,
  DeleteProduct,
  TogglePublishProduct,
} from './product.controller.js';

const route = express.Router();

route.post('/create', upload.array('product_images', 5), validate(createProductSchema), CreateProduct);
route.get('/get-all-products', GetAllProducts);
route.put('/update/:id', upload.array('product_images', 5), validate(updateProductSchema), UpdateProduct);
route.delete('/delete/:id', DeleteProduct);
route.patch('/toggle-publish/:id', TogglePublishProduct);

export default route;
