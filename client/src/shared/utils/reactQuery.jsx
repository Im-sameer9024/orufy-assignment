import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min (balanced)
      gcTime: 1000 * 60 * 5, // 5 min cleanup
      refetchOnWindowFocus: false,
      retry: 1, // avoid infinite retries
      keepPreviousData: true,
    },
    mutations: {
      retry: 0, // no retry for mutations
    },
  },
});

export default queryClient;
