import {
  Bell,
  Building2,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Wallet,
  Wrench,
} from 'lucide-react';

export const nav = [
  { to: '/dashboard', label: 'Inicio', icon: LayoutDashboard },
  { to: '/properties', label: 'Propiedades', icon: Building2 },
  { to: '/contracts', label: 'Contratos', icon: FileText },
  { to: '/payments', label: 'Pagos', icon: Wallet },
  { to: '/messages', label: 'Mensajes', icon: MessageSquare },
  { to: '/claims', label: 'Reclamos', icon: Wrench },
  { to: '/notifications', label: 'Notificaciones', icon: Bell },
];
