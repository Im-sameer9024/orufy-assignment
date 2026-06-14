'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/app/store/authStore';
import { axiosInstance } from '@/services/apiConnector';

const AuthChecker = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setTokenLoading = useAuthStore((state) => state.setTokenLoading);

  useEffect(() => {
    const initAuth = async () => {
      try {
        setTokenLoading(true);

        // 🔥 call refresh token API
        const res = await axiosInstance.get('/auth/refresh-token', {
          __skipAuthRefresh: true,
        });

        console.log(res, 'in auth checker');

        if (res.data?.success) {
          setToken(res.data?.data?.accessToken);
          setUser(res.data?.data?.user);
        }
      } catch (error) {
        console.log(error);
        clearAuth();
      } finally {
        setTokenLoading(false);
      }
    };

    initAuth();
  }, [clearAuth, setToken, setTokenLoading, setUser]);

  return null;
};

export default AuthChecker;
