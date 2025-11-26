import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();

  if (!user) {
    // you can change this to "/personal/login" etc.
    return <Navigate to="/institution/login" replace />;
  }

  return children;
};
