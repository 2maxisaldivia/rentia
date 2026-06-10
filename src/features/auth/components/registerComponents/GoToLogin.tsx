import { Link } from 'react-router-dom';

const GoToLink = () => {
  return (
    <p className="mt-6 text-center text-sm text-muted-foreground">
      ¿Ya tenés cuenta?{' '}
      <Link to="/login" className="font-medium text-primary hover:underline">
        Ingresar
      </Link>
    </p>
  );
};

export default GoToLink;
