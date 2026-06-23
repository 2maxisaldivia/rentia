import { Link, Outlet, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import { Logo } from '../../shared/components/Logo';
import { nav } from '../utils/constants';

const TenantNavPanel = () => {
  const { pathname } = useLocation();

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

        {/* Menu */}

        <nav className="flex-1 space-y-1 px-3">
          {nav.map((item) => {
            const active =
              pathname === item.to || (item.to !== '/dashboard' && pathname.startsWith(item.to));

            return (
              <Link
                key={item.to}
                to={item.to}
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

        {/* Footer sidebar */}

        <div className="border-t border-border">
          {/* User */}

          <div
            className="
              mx-3 mb-3
              flex items-center gap-3
              rounded-xl
              bg-sidebar-accent
              px-3 py-3
            "
          >
            <div
              className="
                flex h-8 w-8
                items-center justify-center
                rounded-full
                bg-primary
                text-xs
                font-medium
                text-primary-foreground
              "
            >
              LM
            </div>

            <div>
              <p className="text-sm font-medium">Lucía Méndez</p>

              <p className="text-xs text-muted-foreground">Propietaria</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}

      <div className="lg:pl-64">
        {/* Topbar */}

        <header
          className="
            sticky top-0 z-20
            flex h-16 items-center gap-3
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
            className="
              rounded-lg p-2
              lg:hidden
            "
          >
            <User size={18} />
          </button>
        </header>

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

export default TenantNavPanel;
