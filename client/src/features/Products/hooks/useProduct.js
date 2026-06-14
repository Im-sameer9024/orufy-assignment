import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ProductApiOperations } from '../productApiOperations';
import { GetApiErrorMessage } from '@/shared/utils/apiMessage';

export const useGetAllProducts = ({ page = 1, limit = 9, search = '', status = 'published' }) => {
  return useQuery({
    queryKey: ['products', page, limit, search, status],

    queryFn: () =>
      ProductApiOperations.GetAllProducts({
        page,
        limit,
        search,
        status,
      }),

    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData) => ProductApiOperations.CreateProduct(formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success(data?.message || 'Product created successfully');
    },
    onError: (error) => {
      toast.error(GetApiErrorMessage(error));
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }) => ProductApiOperations.UpdateProduct(id, formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success(data?.message || 'Product updated successfully');
    },
    onError: (error) => {
      toast.error(GetApiErrorMessage(error));
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => ProductApiOperations.DeleteProduct(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success(data?.message || 'Product deleted successfully');
    },
    onError: (error) => {
      toast.error(GetApiErrorMessage(error));
    },
  });
};

export const useTogglePublishProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => ProductApiOperations.TogglePublishProduct(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success(data?.message || 'Product status updated successfully');
    },
    onError: (error) => {
      toast.error(GetApiErrorMessage(error));
    },
  });
};
