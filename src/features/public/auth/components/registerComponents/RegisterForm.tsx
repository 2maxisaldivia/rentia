import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import {
  getRegistrationErrorMessage,
  registerUser,
} from '../../../../../services/auth.service';
import { createUserProfile } from '../../../../../services/user.service';
import { ROUTES } from '../../../../../shared/routes';

const RegisterForm = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'owner' | 'tenant'>('tenant');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (
      !trimmedFirstName ||
      !trimmedLastName ||
      !trimmedEmail ||
      !trimmedPhone ||
      !password.trim() ||
      !role
    ) {
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }

    if (trimmedPhone.replace(/\D/g, '').length < 8) {
      setErrorMessage('Ingresá un teléfono de contacto válido.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      const firebaseUser = await registerUser(trimmedEmail, password);

      await createUserProfile({
        id: firebaseUser.uid,
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        email: trimmedEmail,
        phone: trimmedPhone,
        role,
        createdAt: new Date(),
      });

      navigate(role === 'owner' ? ROUTES.OWNER_DASHBOARD : ROUTES.TENANT_EXPLORE);
    } catch (error) {
      console.error('Error al crear la cuenta:', error);

      setErrorMessage(getRegistrationErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            Nombre
          </label>

          <input
            id="name"
            required
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            disabled={isLoading}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="last" className="text-sm font-medium">
            Apellido
          </label>

          <input
            id="last"
            required
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            disabled={isLoading}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>

        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isLoading}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="phone" className="text-sm font-medium">
          Teléfono de contacto
        </label>

        <input
          id="phone"
          type="tel"
          required
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          disabled={isLoading}
          placeholder="Ej. +54 9 351 555 1234"
          autoComplete="tel"
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="pass" className="text-sm font-medium">
          Contraseña
        </label>

        <input
          id="pass"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={isLoading}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="role" className="text-sm font-medium">
          Tipo de cuenta
        </label>

        <select
          id="role"
          required
          value={role}
          onChange={(event) => setRole(event.target.value as 'owner' | 'tenant')}
          disabled={isLoading}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="tenant">Inquilino</option>
          <option value="owner">Propietario</option>
        </select>
      </div>

      {errorMessage && (
        <p role="alert" className="text-sm text-destructive">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? (
          'Creando cuenta...'
        ) : (
          <>
            Crear cuenta
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
