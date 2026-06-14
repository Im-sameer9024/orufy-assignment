import { AsyncHandler } from '../../shared/utils/async_handler.js';
import Category from './category.schema.js';

const CreateCategory = AsyncHandler(async (req, res) => {
  const { category_name } = req.body;

  if (!category_name || category_name.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Category name is required',
    });
  }

  const category = await Category.create({
    category_name,
  });

  return res.status(200).json({
    success: true,
    message: 'Category created successfully',
    data: category,
  });
});

const GetAllCategories = AsyncHandler(async (req, res) => {
  const categories = await Category.find({}).sort({ category_name: 1 }).lean();

  return res.status(200).json({
    success: true,
    message: 'Categories fetched successfully',
    data: categories,
  });
});

export { CreateCategory, GetAllCategories };
