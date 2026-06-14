import { Skeleton } from '@/shared/components/ui/skeleton';

const ProductSkeleton = () => {
  return (
    <article className="rounded-3xl border border-[#E4E7EC] bg-white p-4">
      <Skeleton className="h-64 w-full rounded-2xl" />

      <div className="mt-5 space-y-3">
        <Skeleton className="h-5 w-40" />

        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <Skeleton className="h-12 flex-1 rounded-xl" />
        <Skeleton className="h-12 flex-1 rounded-xl" />
        <Skeleton className="h-12 w-12 rounded-xl" />
      </div>
    </article>
  );
};

export default ProductSkeleton;
