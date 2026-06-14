import { z } from 'zod';

const clientNumberSchema = (fieldName) =>
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

export const createProductSchema = z
  .object({
    product_name: z.string().min(3, 'Please enter product name'),

    product_category: z.string().min(1, 'Please select product type'),

    stock_quantity: clientNumberSchema('Quantity'),

    mrp_price: clientNumberSchema('MRP'),

    selling_price: clientNumberSchema('Selling price'),

    product_brandName: z.string().min(1, 'Brand name is required'),

    return_policy: z.enum(['YES', 'NO']),
  })
  .refine(
    (data) => {
      if (data.selling_price === undefined || data.mrp_price === undefined) return true;
      return data.selling_price <= data.mrp_price;
    },
    {
      message: 'Selling price cannot be greater than MRP',
      path: ['selling_price'],
    }
  );
