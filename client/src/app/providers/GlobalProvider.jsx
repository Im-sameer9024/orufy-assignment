import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from '../route';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '@/shared/utils/reactQuery';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/react';
const GlobalProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" closeButton duration={3000} />
      </NuqsAdapter>

      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
};

export default GlobalProvider;
