import { Building2 } from 'lucide-react';

import StatusPill from './StatusPill';

type UpcomingContract = {
  id: string;
  monthlyAmount: number;
  endDate: string;
  property: {
    title: string;
  };
  tenant: {
    fullName: string;
  };
};

type UpcomingSectionProps = {
  contracts: UpcomingContract[];
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`));

const getExpirationStatus = (endDate: string) => {
  const today = new Date();
  const contractEnd = new Date(`${endDate}T12:00:00`);

  today.setHours(0, 0, 0, 0);
  contractEnd.setHours(0, 0, 0, 0);

  const differenceInDays = Math.ceil(
    (contractEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  if (differenceInDays < 0) {
    return {
      label: 'Vencido',
      tone: 'warning' as const,
    };
  }

  if (differenceInDays === 0) {
    return {
      label: 'Vence hoy',
      tone: 'warning' as const,
    };
  }

  return {
    label: `Vence ${formatDate(endDate)}`,
    tone: 'muted' as const,
  };
};

const UpcomingSection = ({ contracts }: UpcomingSectionProps) => {
  const upcomingContracts = [...contracts]
    .sort((a, b) => a.endDate.localeCompare(b.endDate))
    .slice(0, 3);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div>
        <h2 className="font-semibold">Próximos vencimientos</h2>

        <p className="text-xs text-muted-foreground">Contratos activos más próximos a vencer</p>
      </div>

      {upcomingContracts.length === 0 ? (
        <p className="mt-5 text-sm text-muted-foreground">Todavía no tenés contratos activos.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {upcomingContracts.map((contract) => {
            const expiration = getExpirationStatus(contract.endDate);

            return (
              <li
                key={contract.id}
                className="flex items-start gap-3 rounded-xl p-2 transition hover:bg-secondary/60"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-foreground">
                  <Building2 className="h-4 w-4" />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{contract.property.title}</p>

                  <p className="truncate text-xs text-muted-foreground">
                    {contract.tenant.fullName} · {formatPrice(contract.monthlyAmount)}
                  </p>
                </div>

                <StatusPill tone={expiration.tone}>{expiration.label}</StatusPill>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default UpcomingSection;
