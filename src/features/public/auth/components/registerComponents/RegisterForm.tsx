import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../../../services/auth.service';
import { createUserProfile } from '../../../../../services/user.service';
import { ROUTES } from '../../../../../shared/routes';

const RegisterForm = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [role, setRole] = useState<'owner' | 'tenant'>('tenant');
  return (
    <form
      className="mt-8 space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();

        try {
          const firebaseUser = await registerUser(email, password);

          await createUserProfile({
            id: firebaseUser.uid,
            firstName,
            lastName,
            email,
            role,
            createdAt: new Date(),
          });

          navigate(role === 'owner' ? `${ROUTES.OWNER_DASHBOARD}` : `${ROUTES.TENANT_EXPLORE}`);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            Nombre
          </label>

          <input
            id="name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="last" className="text-sm font-medium">
            Apellido
          </label>

          <input
            id="last"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="pass" className="text-sm font-medium">
          Contraseña
        </label>

        <input
          id="pass"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Tipo de cuenta</label>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as 'owner' | 'tenant')}
          className="
      w-full
      rounded-md
      border border-input
      bg-background
      px-3 py-2
      text-sm
      focus:outline-none
      focus:ring-2
      focus:ring-ring
    "
        >
          <option value="tenant">Inquilino</option>

          <option value="owner">Propietario</option>
        </select>
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition"
      >
        Crear cuenta
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
};

export default RegisterForm;
