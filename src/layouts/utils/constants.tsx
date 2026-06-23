import { Building2, FileText, LayoutDashboard } from 'lucide-react';
import { ROUTES } from '../../shared/routes';

export const ownerNav = [
  { to: `${ROUTES.DASHBOARD}`, label: 'Inicio', icon: LayoutDashboard },
  { to: `${ROUTES.PROPERTIES}`, label: 'Propiedades', icon: Building2 },
  { to: `${ROUTES.CONTRACTS}`, label: 'Contratos', icon: FileText },
];

export const tenantNav = [
  { to: `${ROUTES.EXPLORE_PROPERTIES}`, label: 'Explora Propiedades', icon: Building2 },
  { to: `${ROUTES.TENANT_CONTRACTS}`, label: 'Contratos', icon: FileText },
];
