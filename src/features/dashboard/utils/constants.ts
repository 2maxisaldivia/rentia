import { Building2, FileText, Wallet, Wrench } from 'lucide-react';

export const stats = [
  {
    label: 'Propiedades activas',
    value: '12',
    delta: '+2',
    icon: Building2,
    tone: 'primary' as const,
  },
  {
    label: 'Contratos vigentes',
    value: '9',
    delta: '+1',
    icon: FileText,
    tone: 'primary' as const,
  },
  {
    label: 'Pagos pendientes',
    value: '$ 840.500',
    delta: '3 inquilinos',
    icon: Wallet,
    tone: 'warning' as const,
  },
  {
    label: 'Reclamos abiertos',
    value: '4',
    delta: '1 urgente',
    icon: Wrench,
    tone: 'destructive' as const,
  },
];

export const upcoming = [
  {
    name: 'Av. Corrientes 1234 · 5°B',
    tenant: 'Juan Pérez',
    amount: '$ 320.000',
    due: 'En 3 días',
    tone: 'warning' as const,
  },
  {
    name: 'Belgrano 880 · PB',
    tenant: 'María Soler',
    amount: '$ 215.000',
    due: 'En 7 días',
    tone: 'primary' as const,
  },
  {
    name: 'Salta 415 · 2°A',
    tenant: 'Diego Ríos',
    amount: '$ 410.000',
    due: 'Vencido 2 días',
    tone: 'destructive' as const,
  },
];

export const activity = [
  {
    who: 'Juan Pérez',
    action: 'envió comprobante',
    target: 'Corrientes 1234',
    time: 'hace 12 min',
    tone: 'success' as const,
  },
  {
    who: 'Sistema',
    action: 'generó alerta de vencimiento',
    target: 'Salta 415',
    time: 'hace 1 h',
    tone: 'destructive' as const,
  },
  {
    who: 'María Soler',
    action: 'abrió un reclamo',
    target: 'Belgrano 880',
    time: 'hace 3 h',
    tone: 'warning' as const,
  },
  {
    who: 'Vos',
    action: 'creaste el contrato',
    target: 'Rivadavia 2200',
    time: 'ayer',
    tone: 'primary' as const,
  },
];
