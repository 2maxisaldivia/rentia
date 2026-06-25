import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';

import { Logo } from '../shared/components/Logo';
import { ownerNav, tenantNav } from './utils/constants';
import { logoutUser } from '../services/auth.service';
import { useUser } from '../shared/auth/provider/useContextValue';
import { ROUTES } from '../shared/routes';

const NavPanel = () => {
  const { pathname } = useLocation();
  const { user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = user?.role === 'owner' ? ownerNav : tenantNav;
  const ES_ROLE = user?.role === 'owner' ? 'Propietario' : 'Inquilino';
  const userInitials = `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`;
  const profileRoute =
    user?.role === 'owner' ? ROUTES.OWNER_PROFILE : ROUTES.TENANT_PROFILE;

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const renderNavigation = (onNavigate?: () => void) => (
    <>
      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain px-3">
        {navItems.map((item) => {
          const active =
            pathname === item.to ||
            (item.to !== '/owner/dashboard' && pathname.startsWith(item.to));

          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              className={`
                group
                flex items-center gap-3
                rounded-lg px-3 py-2
                text-sm font-medium
                transition-colors

                ${
                  active
                    ? `
                      bg-sidebar-accent
                      text-sidebar-accent-foreground
                    `
                    : `
                      text-muted-foreground
                      hover:bg-sidebar-accent/60
                      hover:text-foreground
                    `
                }
              `}
            >
              <item.icon
                className={`
                  h-4 w-4

                  ${active ? 'text-primary' : 'text-muted-foreground'}
                `}
              />

              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-border pt-3 pb-[env(safe-area-inset-bottom)]">
        <Link
          to={profileRoute}
          onClick={onNavigate}
          className="
            group
            mx-3 mb-3
            flex items-center gap-3
            rounded-xl
            bg-sidebar-accent
            px-3 py-3
            ring-1 ring-transparent
            transition
            hover:-translate-y-0.5
            hover:bg-accent
            hover:ring-border
            hover:shadow-soft
          "
        >
          <div
            className="
              flex h-8 w-8 shrink-0
              items-center justify-center
              rounded-full
              bg-primary
              text-xs
              font-medium
              text-primary-foreground
              transition-transform group-hover:scale-105
            "
          >
            {userInitials}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium transition-colors group-hover:text-primary">
              {user?.firstName} {user?.lastName}
            </p>

            <p className="text-xs text-muted-foreground">{ES_ROLE}</p>
          </div>
        </Link>

        <button
          type="button"
          onClick={async () => {
            onNavigate?.();
            await logoutUser();
          }}
          className="
            mx-3 mb-3
            flex w-[calc(100%-1.5rem)]
            items-center gap-3
            rounded-lg
            px-3 py-2
            text-sm
            font-medium
            text-muted-foreground
            transition
            hover:bg-sidebar-accent
            hover:text-foreground
          "
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <aside
        className="
          fixed left-0 top-0
          hidden h-screen w-64
          border-r-2 border-black/10
          bg-background
          lg:flex lg:flex-col
        "
      >
        {/* Logo */}

        <div className="px-5 py-5">
          <Logo />
        </div>

        {renderNavigation()}
      </aside>

      {/* Main */}

      <div className="lg:pl-64">
        {/* Topbar */}

        <header
          className="
            sticky top-0 z-20
            flex h-16 items-center justify-between gap-3
            border-b border-border
            bg-background/80
            px-4
            backdrop-blur-xl
            sm:px-6
          "
        >
          <div className="lg:hidden">
            <Logo />
          </div>

          <button
            type="button"
            aria-label="Abrir menú de navegación"
            aria-controls="mobile-navigation"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(true)}
            className="
              rounded-lg border border-border p-2
              text-foreground
              transition hover:bg-accent
              lg:hidden
            "
          >
            <Menu size={20} />
          </button>
        </header>

        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <button
              type="button"
              aria-label="Cerrar menú de navegación"
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]"
            />

            <aside
              id="mobile-navigation"
              aria-label="Navegación principal"
              className="
                fixed left-0 top-0 z-50
                flex h-dvh max-h-dvh w-[min(18rem,85vw)] flex-col
                overflow-hidden
                border-r border-border
                bg-background
                shadow-2xl
              "
            >
              <div className="flex shrink-0 items-center justify-between px-5 py-4">
                <Logo />

                <button
                  type="button"
                  aria-label="Cerrar menú de navegación"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg p-2 transition hover:bg-accent"
                >
                  <X size={20} />
                </button>
              </div>

              {renderNavigation(() => setIsMobileMenuOpen(false))}
            </aside>
          </div>
        )}

        {/* Page content */}

        <main
          className="
            px-4 py-6
            sm:px-6
            lg:px-8
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default NavPanel;
