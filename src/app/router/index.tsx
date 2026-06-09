import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LandingPage from '../../features/landing/pages/LandingPage';
import LoginPage from '../../features/auth/pages/LoginPage';
import RegisterPage from '../../features/auth/pages/RegisterPage';

import PublicLayout from '../layouts/PublicLayout';
import { ROUTES } from '../../shared/routes';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.HOME} element={<LandingPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
