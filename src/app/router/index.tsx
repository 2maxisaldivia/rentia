import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from '../../shared/routes';
import PublicLayout from '../../routes/PublicLayout';
import LandingPage from '../../features/public/landing/pages/LandingPage';
import LoginPage from '../../features/public/auth/pages/LoginPage';
import RegisterPage from '../../features/public/auth/pages/RegisterPage';
import PrivateLayout from '../../routes/PrivateLayout';
import Dashboard from '../../features/owner/dashboard/pages/Dashboard';
import OwnerLayout from '../../routes/OwnerLayout';
import Properties from '../../features/owner/properties/pages/Properties';
import Contracts from '../../features/owner/contracts/pages/Contracts';
import { useUser } from '../../shared/auth/provider/useContextValue';
import TenantLayout from '../../routes/TenantLayout';
import ExploreProperties from '../../features/tenant/exploreProperties/pages/ExploreProperties';
import OwnerPropertyDetail from '../../features/owner/owner-property/pages/OwnerPropertyDetail';
import TenantPropertyDetail from '../../features/tenant/tenant-property-detail/page/TenantPropertyDetail';
import TenantContracts from '../../features/tenant/tenant-contracts/page/TenantContracts';

export const AppRouter = () => {
  const { user } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}

        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<LandingPage />} />

          <Route path={ROUTES.LOGIN} element={<LoginPage />} />

          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>

        {/* OWNER */}

        <Route element={<PrivateLayout />}>
          {user.role === 'owner' && (
            <Route element={<OwnerLayout />}>
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path={ROUTES.PROPERTIES} element={<Properties />} />
              <Route path={ROUTES.CONTRACTS} element={<Contracts />} />
              <Route path={ROUTES.OWNER_PROPERTY_DETAIL} element={<OwnerPropertyDetail />} />
            </Route>
          )}
        </Route>

        {/* TENANT */}

        {user.role === 'tenant' && (
          <Route element={<TenantLayout />}>
            <Route path={ROUTES.EXPLORE_PROPERTIES} element={<ExploreProperties />} />
            <Route path={ROUTES.TENANT_PROPERTY_DETAIL} element={<TenantPropertyDetail />} />
            <Route path={ROUTES.TENANT_CONTRACTS} element={<TenantContracts />} />
          </Route>
        )}

        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </BrowserRouter>
  );
};
