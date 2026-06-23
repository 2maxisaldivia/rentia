import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../../shared/routes';

const GoToRegister = () => {
  return (
    <p className="mt-6 text-center text-sm text-muted-foreground">
      ¿No tenés cuenta?{' '}
      <Link to={ROUTES.REGISTER} className="font-medium text-primary hover:underline">
        Crear una
      </Link>
    </p>
  );
};

export default GoToRegister;
