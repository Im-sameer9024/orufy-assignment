import { useState } from 'react';
import { useQueryState } from 'nuqs';
import { LayoutDashboard } from 'lucide-react';

import AllProducts from '@/features/Products/components/AllProducts';
import UpdateProductForm from '@/features/Products/components/UpdateProductForm';
import CustomModal from '@/shared/components/custom/CustomModal';
import { useModal } from '@/shared/hooks/useModal';

import { useGetAllProducts, useDeleteProduct, useTogglePublishProduct } from '@/features/Products/hooks/useProduct';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/components/ui/pagination';

const NoPublishedProducts = ({ tab }) => {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center">
      <LayoutDashboard size={60} className="text-[#000FB4]" />

      <div className="mt-4 text-center">
        <h2 className="text-lg font-semibold text-[#344054]">
          No {tab === 'published' ? 'Published' : 'Unpublished'} Products
        </h2>

        <p className="mt-2 text-sm text-[#98A2B3]">
          Your {tab === 'published' ? 'published' : 'unpublished'} products will appear here.
          {tab === 'published' && (
            <>
              <br />
              Create your first product to publish.
            </>
          )}
        </p>
      </div>
    </section>
  );
};

const HomePage = () => {
  const [tab] = useQueryState('tab', {
    defaultValue: 'published',
  });

  const[search] = useQueryState('search', {
    defaultValue: '',
  })

  const [page, setPage] = useQueryState('page', {
    defaultValue: 1,
    parse: Number,
  });

  const { data, isLoading, isFetching } = useGetAllProducts({
    page,
    limit: 9,
    search: search,
    status: tab,
  });

  const editModal = useModal();
  const deleteConfirmModal = useModal();

  const [productToEdit, setProductToEdit] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  const deleteMutation = useDeleteProduct();
  const togglePublishMutation = useTogglePublishProduct();

  const products = data?.data?.products || [];
  const pagination = data?.data?.pagination;

  const handleEditClick = (product) => {
    setProductToEdit(product);
    editModal.openModal();
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    deleteConfirmModal.openModal();
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      try {
        await deleteMutation.mutateAsync(productToDelete._id);
        deleteConfirmModal.closeModal();
        setProductToDelete(null);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      await togglePublishMutation.mutateAsync(id);
    } catch (error) {
      console.error('Error toggling publish state:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= (pagination?.totalPages || 1)) {
      setPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const current = pagination.currentPage;
    const total = pagination.totalPages;

    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink isActive={current === i} onClick={() => handlePageChange(i)} className="cursor-pointer">
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink isActive={current === 1} onClick={() => handlePageChange(1)} className="cursor-pointer">
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (current > 3) {
        pages.push(
          <PaginationItem key="left-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== total) {
          pages.push(
            <PaginationItem key={i}>
              <PaginationLink isActive={current === i} onClick={() => handlePageChange(i)} className="cursor-pointer">
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      }

      if (current < total - 2) {
        pages.push(
          <PaginationItem key="right-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      pages.push(
        <PaginationItem key={total}>
          <PaginationLink
            isActive={current === total}
            onClick={() => handlePageChange(total)}
            className="cursor-pointer"
          >
            {total}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <>
      <main className="p-4 md:p-6">
        {isLoading ? (
          <AllProducts products={[]} isLoading={true} />
        ) : products.length === 0 ? (
          <NoPublishedProducts tab={tab} />
        ) : (
          <>
            <AllProducts
              products={products}
              isLoading={isLoading || isFetching}
              onTogglePublish={handleTogglePublish}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />

            {pagination && pagination.totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                      className={!pagination.hasPrevPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>

                  {renderPageNumbers()}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                      className={!pagination.hasNextPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      </main>

      {/* Edit Product Modal */}
      <CustomModal open={editModal.open} onOpenChange={editModal.setOpen} title="Edit Product" size="lg">
        {productToEdit && <UpdateProductForm product={productToEdit} onSuccess={editModal.closeModal} />}
      </CustomModal>

      {/* Delete Confirmation Modal */}
      <CustomModal
        open={deleteConfirmModal.open}
        onOpenChange={deleteConfirmModal.setOpen}
        title="Confirm Deletion"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete <strong>{productToDelete?.productName}</strong>? This action cannot be
            undone and will delete the image from Cloudinary.
          </p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={deleteConfirmModal.closeModal}
              className="cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              disabled={deleteMutation.isPending}
              className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default HomePage;
