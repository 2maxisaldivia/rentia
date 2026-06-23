import { Link } from 'react-router-dom';
import { Logo } from '../../../../shared/components/Logo';
import { ROUTES } from '../../../../shared/routes';

const FooterSection = () => {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Rentia — La plataforma para gestionar alquileres entre particulares con trazabilidad y
            simpleza.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Producto</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#beneficios" className="hover:text-foreground">
                Beneficios
              </a>
            </li>
            <li>
              <a href="#funcionalidades" className="hover:text-foreground">
                Funcionalidades
              </a>
            </li>
            <li>
              <Link to={ROUTES.DASHBOARD} className="hover:text-foreground">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Cuenta</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to={ROUTES.LOGIN} className="hover:text-foreground">
                Iniciar sesión
              </Link>
            </li>
            <li>
              <Link to={ROUTES.REGISTER} className="hover:text-foreground">
                Crear cuenta
              </Link>
            </li>
            <li>
              <Link to={ROUTES.LOGIN} className="hover:text-foreground">
                Soy inquilino
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Rentia. Todos los derechos reservados.</p>
          <p>Hecho con cuidado para dueños directos.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
