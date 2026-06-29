import { Building2, FileText, Wallet, Wrench } from 'lucide-react';

import StatusPill from './StatusPill';

type StatsSectionProps = {
  totalProperties: number;
  availableProperties: number;
  rentedProperties: number;
  activeContracts: number;
  monthlyIncome: number;
  openClaims: number;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);

const StatsSection = ({
  totalProperties,
  availableProperties,
  rentedProperties,
  activeContracts,
  monthlyIncome,
  openClaims,
}: StatsSectionProps) => {
  const stats = [
    {
      label: 'Propiedades activas',
      value: totalProperties,
      delta: `${availableProperties} disponibles`,
      tone: 'primary' as const,
      icon: Building2,
    },
    {
      label: 'Contratos vigentes',
      value: activeContracts,
      delta: rentedProperties > 0 ? `${rentedProperties} alquiladas` : 'Sin alquileres',
      tone: activeContracts > 0 ? ('success' as const) : ('muted' as const),
      icon: FileText,
    },
    {
      label: 'Ingreso mensual estimado',
      value: formatPrice(monthlyIncome),
      delta: activeContracts > 0 ? 'Al día' : 'Sin contratos',
      tone: activeContracts > 0 ? ('success' as const) : ('muted' as const),
      icon: Wallet,
    },
    {
      label: 'Reclamos abiertos',
      value: openClaims,
      delta: 'Sin reclamos urgentes',
      tone: 'warning' as const,
      icon: Wrench,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-5 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary">
                <Icon className="h-4 w-4" />
              </span>

              <StatusPill tone={stat.tone}>{stat.delta}</StatusPill>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">{stat.label}</p>

            <p className="mt-1 text-2xl font-semibold tracking-tight">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsSection;
