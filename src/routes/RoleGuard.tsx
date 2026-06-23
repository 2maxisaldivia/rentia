import { Navigate, Outlet } from 'react-router-dom';

import { ROUTES } from '../shared/routes';
import { useUser } from '../shared/auth/provider/useContextValue';

type RoleGuardProps = {
  role: 'owner' | 'tenant';
};

export default function RoleGuard({ role }: RoleGuardProps) {
  const { user } = useUser();

  // por seguridad, si no hay usuario
  // no debería pasar, pero evita errores
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // usuario autenticado pero rol incorrecto
  if (user.role !== role) {
    return (
      <Navigate
        to={user.role === 'owner' ? ROUTES.OWNER_DASHBOARD : ROUTES.TENANT_EXPLORE}
        replace
      />
    );
  }

  return <Outlet />;
}
