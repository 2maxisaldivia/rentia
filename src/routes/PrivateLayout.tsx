import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '../shared/routes';
import { useUser } from '../shared/auth/provider/useContextValue';

export default function PrivateLayout() {
  const { user } = useUser();

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}
