import mongoose from 'mongoose';
import Category from '../category/category.schema.js';
import Product from './product.schema.js';
import { UploadImageToCloudinary, DeleteImageFromCloudinary } from '../../shared/utils/upload.js';
import { AsyncHandler } from '../../shared/utils/async_handler.js';

export const CreateProduct = AsyncHandler(async (req, res) => {
  const {
    product_name,
    product_category,
    stock_quantity,
    isPublished,
    mrp_price,
    selling_price,
    product_brandName,
    return_policy,
  } = req.validatedData;

  console.log(
    product_name,
    product_category,
    stock_quantity,
    isPublished,
    mrp_price,
    selling_price,
    product_brandName,
    return_policy
  );

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'At least one product image is required',
    });
  }

  if (!mongoose.Types.ObjectId.isValid(product_category)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid category id',
    });
  }

  const category = await Category.findById(product_category);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: 'Category not found',
    });
  }

  if (selling_price > mrp_price) {
    return res.status(400).json({
      success: false,
      message: 'Selling price cannot be greater than MRP',
    });
  }

  const uploadedImages = await Promise.all(req.files.map((file) => UploadImageToCloudinary(file)));

  const productImages = uploadedImages.map((image) => ({
    imageUrl: image.secure_url,
    public_id: image.public_id,
  }));

  const product = await Product.create({
    product_name,
    product_category,
    stock_quantity,
    isPublished,
    mrp_price,
    selling_price,
    product_brandName,
    return_policy,
    product_images: productImages,
  });

  return res.status(201).json({
    success: true,
    message: 'Product created successfully',
    product,
  });
});

export const GetAllProducts = AsyncHandler(async (req, res) => {
  const { page = 1, limit = 9, search = '', status = '' } = req.query;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const filter = {};

  // Search
  if (search.trim()) {
    filter.product_name = {
      $regex: search,
      $options: 'i',
    };
  }

  // Published / Unpublished
  if (status === 'published') {
    filter.isPublished = true;
  }

  if (status === 'unpublished') {
    filter.isPublished = false;
  }

  const totalProducts = await Product.countDocuments(filter);

  const products = await Product.find(filter)
    .populate('product_category')
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * limitNumber)
    .limit(limitNumber)
    .lean();

  return res.status(200).json({
    success: true,
    message: 'Products fetched successfully',
    data: {
      products,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(totalProducts / limitNumber),
        totalProducts,
        limit: limitNumber,
        hasNextPage: pageNumber < Math.ceil(totalProducts / limitNumber),
        hasPrevPage: pageNumber > 1,
      },
    },
  });
});

export const UpdateProduct = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid product ID',
    });
  }

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  const {
    product_name,
    product_category,
    stock_quantity,
    isPublished,
    mrp_price,
    selling_price,
    product_brandName,
    return_policy,
    existing_images,
  } = req.validatedData;

  if (product_category) {
    if (!mongoose.Types.ObjectId.isValid(product_category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category id',
      });
    }

    const category = await Category.findById(product_category);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }
  }

  const mrpVal = mrp_price !== undefined ? mrp_price : product.mrp_price;
  const sellVal = selling_price !== undefined ? selling_price : product.selling_price;
  if (Number(sellVal) > Number(mrpVal)) {
    return res.status(400).json({
      success: false,
      message: 'Selling price cannot be greater than MRP',
    });
  }

  let productImages = [...product.product_images];

  // Handle existing images deletion
  if (existing_images !== undefined) {
    let parsedExisting = [];
    try {
      parsedExisting = typeof existing_images === 'string' ? JSON.parse(existing_images) : existing_images;
    } catch (err) {
      parsedExisting = [];
    }

    // Identify which original images are being removed
    const imagesToDelete = product.product_images.filter(
      (origImg) => !parsedExisting.some((existImg) => existImg.public_id === origImg.public_id)
    );

    // Delete removed images from Cloudinary
    for (const img of imagesToDelete) {
      await DeleteImageFromCloudinary(img.public_id);
    }

    productImages = parsedExisting;
  }

  // Upload new images if any
  if (req.files && req.files.length > 0) {
    const uploadedImages = await Promise.all(req.files.map((file) => UploadImageToCloudinary(file)));
    const newImages = uploadedImages.map((image) => ({
      imageUrl: image.secure_url,
      public_id: image.public_id,
    }));
    productImages = [...productImages, ...newImages];
  }

  // Update the product fields
  if (product_name !== undefined) product.product_name = product_name;
  if (product_category !== undefined) product.product_category = product_category;
  if (stock_quantity !== undefined) product.stock_quantity = stock_quantity;
  if (isPublished !== undefined) product.isPublished = isPublished;
  if (mrp_price !== undefined) product.mrp_price = mrp_price;
  if (selling_price !== undefined) product.selling_price = selling_price;
  if (product_brandName !== undefined) product.product_brandName = product_brandName;
  if (return_policy !== undefined) product.return_policy = return_policy;
  product.product_images = productImages;

  await product.save();

  const updatedProduct = await Product.findById(id).populate('product_category');

  return res.status(200).json({
    success: true,
    message: 'Product updated successfully',
    product: updatedProduct,
  });
});

export const DeleteProduct = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid product ID',
    });
  }

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  // Delete all images from Cloudinary
  if (product.product_images && product.product_images.length > 0) {
    for (const image of product.product_images) {
      if (image.public_id) {
        await DeleteImageFromCloudinary(image.public_id);
      }
    }
  }

  await Product.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

export const TogglePublishProduct = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid product ID',
    });
  }

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found',
    });
  }

  product.isPublished = !product.isPublished;
  await product.save();

  return res.status(200).json({
    success: true,
    message: `Product ${product.isPublished ? 'published' : 'unpublished'} successfully`,
    product,
  });
});
