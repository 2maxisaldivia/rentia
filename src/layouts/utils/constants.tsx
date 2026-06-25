import { Building2, FileText, LayoutDashboard } from 'lucide-react';
import { ROUTES } from '../../shared/routes';

export const ownerNav = [
  { to: `${ROUTES.OWNER_DASHBOARD}`, label: 'Inicio', icon: LayoutDashboard },
  { to: `${ROUTES.OWNER_PROPERTIES}`, label: 'Propiedades', icon: Building2 },
  { to: `${ROUTES.OWNER_CONTRACTS}`, label: 'Contratos', icon: FileText },
];

export const tenantNav = [
  { to: `${ROUTES.TENANT_EXPLORE}`, label: 'Explorar propiedades', icon: Building2 },
  { to: `${ROUTES.TENANT_RENTAL}`, label: 'Mis alquileres', icon: LayoutDashboard },
  { to: `${ROUTES.TENANT_CONTRACTS}`, label: 'Contratos', icon: FileText },
];
