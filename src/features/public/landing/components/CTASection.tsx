import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../shared/routes';

const CTASection = () => {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Listo para profesionalizar tus alquileres.
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
        Creá tu cuenta gratis y publicá tu primera propiedad en menos de 3 minutos.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          to={ROUTES.REGISTER}
          className="bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 rounded-md px-8 py-1.5"
        >
          Publicar propiedad
        </Link>

        <Link
          to={ROUTES.LOGIN}
          className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 rounded-md px-8 py-1.5"
        >
          Ingresar
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
