import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Logo } from '../../../../shared/components/Logo';
import { ROUTES } from '../../../../shared/routes';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

        <div className="hidden items-center gap-3 md:flex">
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

        <button
          type="button"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-controls="landing-mobile-menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          className="rounded-lg border border-border p-2 text-foreground transition hover:bg-accent md:hidden"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="landing-mobile-menu"
          aria-label="Navegación móvil"
          className="border-t border-border bg-background px-4 py-4 shadow-soft md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            <Link
              to={ROUTES.LOGIN}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium transition hover:bg-accent"
            >
              Buscar alquiler
            </Link>

            <Link
              to={ROUTES.LOGIN}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium transition hover:bg-accent"
            >
              Ingresar
            </Link>

            <Link
              to={ROUTES.REGISTER}
              onClick={() => setIsMenuOpen(false)}
              className="rounded-lg bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Publicar propiedad
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
