import { useAuthStore } from '@/app/store/authStore';
import { Navigate } from 'react-router-dom';
import CustomSpinner from '../custom/CustomSpinner.jsx';

const PrivateRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  const tokenLoading = useAuthStore((state) => state.tokenLoading);

  if (tokenLoading) {
    return <CustomSpinner />;
  }

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
