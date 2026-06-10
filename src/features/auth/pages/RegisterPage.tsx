import MarketingPanel from '../components/registerComponents/MarketingPanel';
import RegisterTitleSection from '../components/registerComponents/RegisterTitleSection';
import RegisterForm from '../components/registerComponents/RegisterForm';
import GoToLogin from '../components/registerComponents/GoToLogin';

const RegisterPage = () => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <MarketingPanel />

      <div className="flex flex-col px-6 py-10 sm:px-10">
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
          <RegisterTitleSection />
          <RegisterForm />
          <GoToLogin />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
