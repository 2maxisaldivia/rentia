import CurrentYear from '../components/loginComponents/CurrentYear';
import LoginTitleSection from '../components/loginComponents/LoginTitleSection';
import LoginForm from '../components/loginComponents/LoginForm';
import GoToRegister from '../components/loginComponents/GoToRegister';
import BrandPanel from '../components/loginComponents/BrandPanel';
import { Logo } from '../../../../shared/components/Logo';

const LoginPage = () => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col px-6 py-10 sm:px-10">
        <Logo />
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
          <>
            <LoginTitleSection />
            <LoginForm />
            <GoToRegister />
          </>
        </div>
        <CurrentYear />
      </div>

      <BrandPanel />
    </div>
  );
};

export default LoginPage;
