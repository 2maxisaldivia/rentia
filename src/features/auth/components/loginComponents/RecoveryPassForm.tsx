const RecoveryPassForm = ({ handleBackToLogin }: { handleBackToLogin: () => void }) => {
  return (
    <form
      className="mt-8 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleBackToLogin();
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
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-white font-medium hover:bg-ring transition"
      >
        Enviar enlace
      </button>

      {/* Secondary action */}
      <button
        type="button"
        onClick={handleBackToLogin}
        className="w-full text-center text-sm text-gray-500 hover:text-gray-900 transition"
      >
        Volver a ingresar
      </button>
    </form>
  );
};

export default RecoveryPassForm;
