import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel.jsx';

const ProductCard = ({ product, isPublished, isPublishing = false, onTogglePublish, onEdit, onDelete }) => {
  const { productName, category, quantity, mrp, sellingPrice, brand, images = [], exchangeEligible } = product;

  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    handleSelect();
    api.on('select', handleSelect);

    return () => {
      api.off?.('select', handleSelect);
    };
  }, [api]);

  return (
    <article className="overflow-hidden rounded-3xl border border-[#E4E7EC] bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      {/* Images */}
      <div className="overflow-hidden rounded-2xl border border-[#E4E7EC] p-3">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {images.length > 0 ? (
              images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="flex h-64 items-center justify-center bg-[#F9FAFB]">
                    <img src={image} alt={`${productName}-${index + 1}`} className="h-full w-full object-contain" />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem>
                <div className="flex h-64 items-center justify-center bg-[#F9FAFB] text-gray-400">No Image</div>
              </CarouselItem>
            )}
          </CarouselContent>

          {images.length > 1 && (
            <>
              <CarouselPrevious />
              <CarouselNext />
            </>
          )}
        </Carousel>

        {/* Dots */}
        {images.length > 1 && (
          <div className="mt-3 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to image ${index + 1}`}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  current === index ? 'scale-110 bg-[#F97316]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="mt-5">
        <h2 className="text-base font-semibold text-[#101828]">{productName}</h2>

        <div className="mt-4 space-y-2">
          <InfoRow label="Product Type" value={category} />
          <InfoRow label="Stock Quantity" value={quantity} />
          <InfoRow label="MRP" value={`₹${mrp}`} />
          <InfoRow label="Selling Price" value={`₹${sellingPrice}`} />
          <InfoRow label="Brand Name" value={brand} />
          <InfoRow label="Images" value={images.length} />
          <InfoRow label="Exchange Eligibility" value={exchangeEligible ? 'YES' : 'NO'} />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <button
          type="button"
          disabled={isPublishing}
          onClick={onTogglePublish}
          className={`flex-1 rounded-xl py-3 text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 ${
            isPublished ? 'bg-linear-to-b from-[#52D407] to-[#37C100]' : 'bg-linear-to-b from-[#000FB4] to-[#4050FF]'
          }`}
        >
          {isPublishing ? 'Updating...' : isPublished ? 'Unpublish' : 'Publish'}
        </button>

        <button
          type="button"
          onClick={onEdit}
          className="flex-1 rounded-xl border border-[#344054] py-3 text-sm font-semibold text-[#344054] transition-colors hover:bg-gray-50"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="group flex h-12 w-12 items-center justify-center rounded-xl border border-[#D0D5DD] transition-colors hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 size={18} className="text-[#98A2B3] transition-colors group-hover:text-red-500" />
        </button>
      </div>
    </article>
  );
};

const InfoRow = ({ label, value }) => {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="font-medium text-[#98A2B3]">{label}</span>

      <span className="font-medium text-[#344054]">{value}</span>
    </div>
  );
};

export default ProductCard;
