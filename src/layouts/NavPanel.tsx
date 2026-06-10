import { Link, Outlet, useLocation } from 'react-router-dom';
import { Bell, Search, User, Settings } from 'lucide-react';
import { Logo } from '../shared/components/Logo';
import { nav } from './utils/constants';

const NavPanel = () => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}

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
          {/* Settings */}

          <Link
            to="/settings"
            className="
              flex items-center gap-3
              px-5 py-4
              text-sm
              text-muted-foreground
              transition-colors
              hover:bg-sidebar-accent/60
              hover:text-foreground
            "
          >
            <Settings size={16} />
            Configuración
          </Link>

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

          <div
            className="
              relative ml-auto
              hidden max-w-md flex-1
              sm:block
            "
          >
            <Search
              className="
                absolute left-3 top-1/2
                -translate-y-1/2
                text-muted-foreground
              "
              size={16}
            />

            <input
              placeholder="Buscar propiedad, contrato, inquilino..."
              className="
                w-full
                rounded-lg
                border border-border
                bg-background
                py-2 pl-9 pr-3
                text-sm
                outline-none
                focus:ring-2
                focus:ring-primary
              "
            />
          </div>

          <button
            className="
              rounded-lg p-2
              transition-colors
              hover:bg-sidebar-accent
            "
          >
            <Bell size={18} className="text-muted-foreground" />
          </button>

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

export default NavPanel;
