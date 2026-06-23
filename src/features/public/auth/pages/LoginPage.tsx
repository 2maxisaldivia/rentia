import { useState } from 'react';
import CurrentYear from '../components/loginComponents/CurrentYear';
import LoginTitleSection from '../components/loginComponents/LoginTitleSection';
import LoginForm from '../components/loginComponents/LoginForm';
import GoToRegister from '../components/loginComponents/GoToRegister';
import RecoveryPassTitleSection from '../components/loginComponents/RecoveryPassTitleSection';
import RecoveryPassForm from '../components/loginComponents/RecoveryPassForm';
import BrandPanel from '../components/loginComponents/BrandPanel';
import { Logo } from '../../../../shared/components/Logo';

const LoginPage = () => {
  const [mode, setMode] = useState<'login' | 'forgot'>('login');

  const handleRecoveryPass = () => {
    setMode('forgot');
  };

  const handleBackToLogin = () => {
    setMode('login');
  };
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-6 py-10 sm:px-10">
        <Logo />
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
          {mode === 'login' ? (
            <>
              <LoginTitleSection />
              <LoginForm handleRecoveryPass={handleRecoveryPass} />
              <GoToRegister />
            </>
          ) : (
            <>
              <RecoveryPassTitleSection />
              <RecoveryPassForm handleBackToLogin={handleBackToLogin} />
            </>
          )}
        </div>
        <CurrentYear />
      </div>

      <BrandPanel />
    </div>
  );
};

export default LoginPage;
