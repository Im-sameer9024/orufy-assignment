import ProductSkeleton from '../skeleton/ProductSkeleton.jsx';
import ProductCard from './ProductCard.jsx';

const AllProducts = ({ publishingId, products = [], isLoading = false, onTogglePublish, onEdit, onDelete }) => {
  if (isLoading) {
    return (
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (!products.length) {
    return <div className="py-20 text-center text-gray-500">No Products Found</div>;
  }

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={{
            _id: product._id,
            productName: product.product_name,
            category: product.product_category?.category_name,
            quantity: product.stock_quantity,
            mrp: product.mrp_price,
            sellingPrice: product.selling_price,
            brand: product.product_brandName,
            images: product.product_images?.map((img) => img.imageUrl) || [],
            exchangeEligible: product.return_policy === 'YES',
            // raw fields for update form
            product_name: product.product_name,
            product_category: product.product_category,
            stock_quantity: product.stock_quantity,
            mrp_price: product.mrp_price,
            selling_price: product.selling_price,
            product_brandName: product.product_brandName,
            return_policy: product.return_policy,
            product_images: product.product_images || [],
          }}
          isPublished={product.isPublished}
          isPublishing={publishingId === product._id}
          onTogglePublish={() => onTogglePublish?.(product._id)}
          onEdit={() => onEdit?.(product)}
          onDelete={() => onDelete?.(product)}
        />
      ))}
    </section>
  );
};

export default AllProducts;
