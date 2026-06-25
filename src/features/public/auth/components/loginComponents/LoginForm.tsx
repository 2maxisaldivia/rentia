import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../../../../../services/auth.service';
import { getUserProfile } from '../../../../../services/user.service';
import { ROUTES } from '../../../../../shared/routes';

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage('');
    setIsLoading(true);

    try {
      const firebaseUser = await loginUser(email, password);

      const userProfile = await getUserProfile(firebaseUser.uid);

      if (!userProfile) {
        setErrorMessage(
          'No encontramos el perfil de este usuario. Intentá registrarte nuevamente.',
        );
        return;
      }

      navigate(userProfile.role === 'owner' ? ROUTES.OWNER_DASHBOARD : ROUTES.TENANT_EXPLORE);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);

      setErrorMessage('El email o la contraseña son incorrectos. Intentá nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>

        <input
          id="email"
          type="email"
          placeholder="hola@rentia.app"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isLoading}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="pass" className="text-sm font-medium">
            Contraseña
          </label>
        </div>

        <input
          id="pass"
          type="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={isLoading}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? 'Ingresando...' : 'Ingresar'}
      </button>
    </form>
  );
};

export default LoginForm;
