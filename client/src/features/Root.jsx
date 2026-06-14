import { useAuthStore } from '@/app/store/authStore.js';
import { Navigate } from 'react-router-dom';

const Root = () => {
  const token = useAuthStore((state) => state.token);
  console.log(token, 'token is herein root');

  return <Navigate to={token ? '/home' : '/login'} replace />;
};

export default Root;
