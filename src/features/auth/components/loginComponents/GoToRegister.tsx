import { Link } from 'react-router-dom';

const GoToRegister = () => {
  return (
    <p className="mt-6 text-center text-sm text-muted-foreground">
      ¿No tenés cuenta?{' '}
      <Link to="/register" className="font-medium text-primary hover:underline">
        Crear una
      </Link>
    </p>
  );
};

export default GoToRegister;
