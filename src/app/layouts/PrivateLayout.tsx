import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../../shared/routes';

export default function PrivateLayout() {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}
