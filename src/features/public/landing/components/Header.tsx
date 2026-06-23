import { Link } from 'react-router-dom';
import { Logo } from '../../../../shared/components/Logo';
import { ROUTES } from '../../../../shared/routes';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#beneficios" className="hover:text-foreground">
            Beneficios
          </a>
          <a href="#funcionalidades" className="hover:text-foreground">
            Funcionalidades
          </a>
          <a href="#para-quien" className="hover:text-foreground">
            Para quién
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <Link
              to={ROUTES.LOGIN}
              className="rounded-lg px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              Buscar alquiler
            </Link>
            <Link
              to={ROUTES.LOGIN}
              className="rounded-lg px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              Ingresar
            </Link>

            <Link
              to={ROUTES.REGISTER}
              className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90"
            >
              Publicar propiedad
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
