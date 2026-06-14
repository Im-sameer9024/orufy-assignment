import App from '@/App';
import LoginPage from '@/features/Auth/pages/LoginPage';
import OtpPage from '@/features/Auth/pages/OtpPage.jsx';
import SignupPage from '@/features/Auth/pages/SignupPage';
import HomePage from '@/features/Home/pages/HomePage.jsx';

import AuthLayout from '@/features/layouts/AuthLayout';
import MainLayout from '@/features/layouts/MainLayout.jsx';
import ProductsPage from '@/features/Products/pages/ProductsPage.jsx';
import Root from '@/features/Root';
import OpenRoute from '@/shared/components/common/OpenRoute';
import PrivateRoute from '@/shared/components/common/PrivateRoute';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      // ---------------- Auth Layout ----------------------
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            element: (
              <OpenRoute>
                <LoginPage />
              </OpenRoute>
            ),
          },
          {
            path: '/signup',
            element: (
              <OpenRoute>
                <SignupPage />
              </OpenRoute>
            ),
          },
          {
            path: '/verify-otp',
            element: (
              <OpenRoute>
                <OtpPage />
              </OpenRoute>
            ),
          },
        ],
      },

      // ---------------- Main Layout ----------------------

      {
        element: <MainLayout />,
        children: [
          {
            path: '/home',
            element: (
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            ),
          },
          {
            path: '/products',
            element: (
              <PrivateRoute>
                <ProductsPage />
              </PrivateRoute>
            ),
          },
        ],
      },

      {
        path: '/',
        element: <Root />,
      },
    ],
  },
]);
