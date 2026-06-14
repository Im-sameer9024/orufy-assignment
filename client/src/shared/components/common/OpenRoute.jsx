import { useAuthStore } from '@/app/store/authStore';
import { Navigate } from 'react-router-dom';
// import CustomSpinner from '../custom/CustomSpinner';

const OpenRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default OpenRoute;
