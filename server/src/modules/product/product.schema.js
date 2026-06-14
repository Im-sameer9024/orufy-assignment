import mongoose from 'mongoose';
import { policyEnum, policyStatus } from '../../shared/utils/constants.js';

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
      trim: true,
    },
    product_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    stock_quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
    mrp_price: {
      type: Number,
      required: true,
      min: 0,
    },
    selling_price: {
      type: Number,
      required: true,
      min: 0,
    },
    product_brandName: {
      type: String,
      required: true,
    },
    product_images: [
      {
        imageUrl: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
    return_policy: {
      type: String,
      enum: policyEnum,
      required: true,
      default: policyStatus.NO,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({
  product_category: 1,
});

productSchema.index({
  createAt: -1,
});

productSchema.index({
  product_name: 'text',
});

const Product = mongoose.model('Product', productSchema);

export default Product;
