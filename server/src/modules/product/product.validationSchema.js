import { z } from 'zod';

const preprocessNumber = (fieldName) =>
  z.preprocess(
    (val) => {
      if (val === undefined || val === null || val === '') return undefined;
      const parsed = Number(val);
      return isNaN(parsed) ? val : parsed;
    },
    z
      .number({
        required_error: `${fieldName} is required`,
        invalid_type_error: `${fieldName} must be a number`,
      })
      .min(0, `${fieldName} cannot be less than 0`)
  );

export const createProductSchema = z.object({
  product_name: z.string().trim().min(1, 'Product name is required'),

  product_category: z.string().min(1, 'Product category is required'),

  stock_quantity: preprocessNumber('Stock quantity'),

  isPublished: z
    .union([z.boolean(), z.string()])
    .optional()
    .transform((val) => {
      if (typeof val === 'string') return val === 'true';
      return val;
    }),

  mrp_price: preprocessNumber('MRP price'),

  selling_price: preprocessNumber('Selling price'),

  product_brandName: z.string().trim().min(1, 'Brand name is required'),

  return_policy: z.enum(['YES', 'NO']),
});

export const updateProductSchema = z.object({
  product_name: z.string().trim().min(1, 'Product name is required').optional(),

  product_category: z.string().min(1, 'Product category is required').optional(),

  stock_quantity: z
    .preprocess(
      (val) => {
        if (val === undefined || val === null || val === '') return undefined;
        const parsed = Number(val);
        return isNaN(parsed) ? val : parsed;
      },
      z
        .number({
          invalid_type_error: 'Stock quantity must be a number',
        })
        .min(0, 'Stock quantity cannot be less than 0')
    )
    .optional(),

  isPublished: z
    .union([z.boolean(), z.string()])
    .optional()
    .transform((val) => {
      if (typeof val === 'string') return val === 'true';
      return val;
    }),

  mrp_price: z
    .preprocess(
      (val) => {
        if (val === undefined || val === null || val === '') return undefined;
        const parsed = Number(val);
        return isNaN(parsed) ? val : parsed;
      },
      z
        .number({
          invalid_type_error: 'MRP price must be a number',
        })
        .min(0, 'MRP price cannot be less than 0')
    )
    .optional(),

  selling_price: z
    .preprocess(
      (val) => {
        if (val === undefined || val === null || val === '') return undefined;
        const parsed = Number(val);
        return isNaN(parsed) ? val : parsed;
      },
      z
        .number({
          invalid_type_error: 'Selling price must be a number',
        })
        .min(0, 'Selling price cannot be less than 0')
    )
    .optional(),

  product_brandName: z.string().trim().min(1, 'Brand name is required').optional(),

  return_policy: z.enum(['YES', 'NO']).optional(),

  existing_images: z.string().optional(),
});
