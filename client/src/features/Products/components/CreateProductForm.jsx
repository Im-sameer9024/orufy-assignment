import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Loader2 } from 'lucide-react';

import InputField from '@/shared/components/custom/InputField';
import CustomSelect from '@/shared/components/custom/CustomSelect';

import { createProductSchema } from '../validation/product.validation';
import { useCreateProduct } from '../hooks/useProduct';
import { useGetAllCategories } from '../../Category/hooks/useCategory';

const CreateProductForm = ({ onSuccess }) => {
  const [images, setImages] = useState([]);
  const [uploadError, setUploadError] = useState('');

  const { data: categoriesData, isLoading: categoriesLoading } = useGetAllCategories();
  const createProductMutation = useCreateProduct();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      product_name: '',
      product_category: '',
      stock_quantity: '',
      mrp_price: '',
      selling_price: '',
      product_brandName: '',
      return_policy: 'YES',
    },
  });

  const handleImages = (event) => {
    const files = Array.from(event.target.files || []);
    setImages((prev) => [...prev, ...files]);
    setUploadError('');
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    if (images.length === 0) {
      setUploadError('At least one product image is required');
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    images.forEach((image) => {
      formData.append('product_images', image);
    });

    try {
      await createProductMutation.mutateAsync(formData);
      onSuccess?.();
    } catch (error) {
      console.log('Error creating product:', error);
    }
  };

  const categories = categoriesData?.data || [];
  const categoryOptions = categories.map((cat) => ({
    label: cat.category_name.toUpperCase(),
    value: cat._id,
  }));

  const isPending = createProductMutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Product Name */}
      <InputField
        label="Product Name"
        name="product_name"
        control={control}
        placeholder="Enter product name"
        error={errors.product_name}
        disabled={isPending}
      />

      {/* Product Category */}
      <CustomSelect
        name="product_category"
        control={control}
        label="Product Type"
        placeholder={categoriesLoading ? 'Loading categories...' : 'Select Product Type'}
        error={errors.product_category}
        options={categoryOptions}
        disabled={categoriesLoading || isPending}
      />

      {/* Quantity */}
      <InputField
        label="Quantity Stock"
        name="stock_quantity"
        type="number"
        min="0"
        control={control}
        placeholder="200"
        error={errors.stock_quantity}
        disabled={isPending}
      />

      {/* MRP */}
      <InputField
        label="MRP"
        name="mrp_price"
        type="number"
        min="0"
        control={control}
        placeholder="2000"
        error={errors.mrp_price}
        disabled={isPending}
      />

      {/* Selling Price */}
      <InputField
        label="Selling Price"
        name="selling_price"
        type="number"
        min="0"
        control={control}
        placeholder="1500"
        error={errors.selling_price}
        disabled={isPending}
      />

      {/* Brand Name */}
      <InputField
        label="Brand Name"
        name="product_brandName"
        control={control}
        placeholder="CakeZone"
        error={errors.product_brandName}
        disabled={isPending}
      />

      {/* Images */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-[#344054]">Upload Product Images</label>

          <label
            className={`text-btnBlue cursor-pointer text-sm font-medium ${isPending ? 'pointer-events-none opacity-50' : ''}`}
          >
            Add More Photos
            <input
              multiple
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImages}
              disabled={isPending}
            />
          </label>
        </div>

        <div className="flex min-h-30 flex-wrap gap-3 rounded-xl border border-dashed border-[#D0D5DD] p-4">
          {images.length === 0 && (
            <div className="flex w-full items-center justify-center text-sm text-gray-400">Upload product images</div>
          )}

          {images.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt={`preview-${index}`}
                className="h-20 w-20 rounded-md border object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 rounded-full bg-white p-1 shadow-md hover:bg-gray-100"
                disabled={isPending}
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
        {uploadError && <p className="text-xs text-red-500">{uploadError}</p>}
      </div>

      {/* Return Policy */}
      <CustomSelect
        name="return_policy"
        control={control}
        label="Exchange or return eligibility"
        placeholder="Select Option"
        error={errors.return_policy}
        options={[
          {
            label: 'Yes',
            value: 'YES',
          },
          {
            label: 'No',
            value: 'NO',
          },
        ]}
        disabled={isPending}
      />

      {/* Submit */}
      <div className="flex justify-end border-t pt-5">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center justify-center gap-2 rounded-lg bg-linear-to-b from-[#000FB4] to-[#4050FF] px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            'Create'
          )}
        </button>
      </div>
    </form>
  );
};

export default CreateProductForm;
