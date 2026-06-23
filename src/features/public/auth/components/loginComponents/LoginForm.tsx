import { useNavigate } from 'react-router-dom';

const LoginForm = ({ handleRecoveryPass }: { handleRecoveryPass: () => void }) => {
  const navigate = useNavigate();
  return (
    <form
      className="mt-8 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        navigate('/dashboard');
      }}
    >
      {/* Email */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>

        <input
          id="email"
          type="email"
          placeholder="hola@rentia.app"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="pass" className="text-sm font-medium">
            Contraseña
          </label>

          <button
            type="button"
            onClick={handleRecoveryPass}
            className="text-xs text-primary hover:underline"
          >
            Recuperar
          </button>
        </div>

        <input
          id="pass"
          type="password"
          placeholder="••••••••"
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-white font-medium hover:bg-ring transition"
      >
        Ingresar
      </button>
    </form>
  );
};

export default LoginForm;
