import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from '../../features/landing/pages/LandingPage';
import LoginPage from '../../features/auth/pages/LoginPage';
import RegisterPage from '../../features/auth/pages/RegisterPage';

import PublicLayout from '../../routes/PublicLayout';
import { ROUTES } from '../../shared/routes';
import Dashboard from '../../features/dashboard/pages/Dashboard';
import PrivateLayout from '../../routes/PrivateLayout';
import NavPanel from '../../layouts/NavPanel';
import Properties from '../../features/properties/pages/Properties';
import Contracts from '../../features/contracts/pages/Contracts';

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
