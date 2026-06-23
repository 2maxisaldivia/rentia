import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ROUTES } from '../../shared/routes';

// layouts
import PublicLayout from '../../routes/PublicLayout';
import PrivateLayout from '../../routes/PrivateLayout';
import RoleGuard from '../../routes/RoleGuard';
import OwnerLayout from '../../routes/OwnerLayout';

import LandingPage from '../../features/public/landing/pages/LandingPage';
import LoginPage from '../../features/public/auth/pages/LoginPage';
import RegisterPage from '../../features/public/auth/pages/RegisterPage';

import Dashboard from '../../features/owner/dashboard/pages/Dashboard';
import Properties from '../../features/owner/properties/pages/Properties';
import Contracts from '../../features/owner/contracts/pages/Contracts';
import OwnerPropertyDetail from '../../features/owner/owner-property/pages/OwnerPropertyDetail';
import ExploreProperties from '../../features/tenant/exploreProperties/pages/ExploreProperties';
import TenantPropertyDetail from '../../features/tenant/tenant-property-detail/page/TenantPropertyDetail';
import TenantContracts from '../../features/tenant/tenant-contracts/page/TenantContracts';
import TenantLayout from '../../routes/TenantLayout';
import CreateProperty from '../../features/owner/properties/pages/CreateProperty';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}

        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<LandingPage />} />

          <Route path={ROUTES.LOGIN} element={<LoginPage />} />

          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>

        {/* PRIVATE */}

        {/* OWNER */}

        <Route element={<PrivateLayout />}>
          <Route element={<RoleGuard role="owner" />}>
            <Route element={<OwnerLayout />}>
              <Route path={ROUTES.OWNER_DASHBOARD} element={<Dashboard />} />
              <Route path={ROUTES.OWNER_PROPERTIES} element={<Properties />} />
              <Route path={ROUTES.OWNER_PROPERTY_CREATE} element={<CreateProperty />} />
              <Route path={ROUTES.OWNER_CONTRACTS} element={<Contracts />} />
              <Route path={ROUTES.OWNER_PROPERTY_DETAIL} element={<OwnerPropertyDetail />} />
            </Route>
          </Route>

          {/* TENANT */}

          <Route element={<RoleGuard role="tenant" />}>
            <Route element={<TenantLayout />}>
              <Route path={ROUTES.TENANT_EXPLORE} element={<ExploreProperties />} />
              <Route path={ROUTES.TENANT_CONTRACTS} element={<TenantContracts />} />
              <Route path={ROUTES.TENANT_PROPERTY_DETAIL} element={<TenantPropertyDetail />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
