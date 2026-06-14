import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { CategoryApiOperations } from '../categoryApiOperations';
import { GetApiErrorMessage } from '@/shared/utils/apiMessage';

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryApiOperations.GetAllCategories(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => CategoryApiOperations.CreateCategory(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success(data?.message || 'Category created successfully');
    },
    onError: (error) => {
      toast.error(GetApiErrorMessage(error));
    },
  });
};
