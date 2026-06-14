import { Plus } from 'lucide-react';

const ProductBar = ({ onAddProduct }) => {
  return (
    <section className="flex items-center justify-between bg-white px-6 py-4">
      <h1 className="text-lg font-semibold text-[#344054]">Products</h1>

      <button
        type="button"
        onClick={onAddProduct}
        className="flex items-center gap-1 text-base font-medium text-[#667085] transition-colors hover:text-[#344054]"
      >
        <Plus size={18} />

        <span>Add Product</span>
      </button>
    </section>
  );
};

export default ProductBar;
