import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from '../../features/public/landing/pages/LandingPage';

import PublicLayout from '../../routes/PublicLayout';
import { ROUTES } from '../../shared/routes';
import Dashboard from '../../features/owner/dashboard/pages/Dashboard';
import PrivateLayout from '../../routes/PrivateLayout';
import NavPanel from '../../layouts/NavPanel';
import Properties from '../../features/owner/properties/pages/Properties';
import LoginPage from '../../features/public/auth/pages/LoginPage';
import Contracts from '../../features/owner/contracts/pages/Contracts';
import RegisterPage from '../../features/public/auth/pages/RegisterPage';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<LandingPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route element={<NavPanel />}>
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.PROPERTIES} element={<Properties />} />
            <Route path={ROUTES.CONTRACTS} element={<Contracts />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
