import { create } from 'zustand';

const initialState = {
  token: null,
  tokenLoading: false,
  user: null,
  identifier: '',
  expiry: null,
};

export const useAuthStore = create((set) => ({
  ...initialState,

  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  setTokenLoading: (loading) => set({ tokenLoading: loading }),
  setIdentifier: (identifier) => set({ identifier }),
  setExpiry: (expiry) => set({ expiry }),
  clearAuth: () => set({ ...initialState }),
}));
