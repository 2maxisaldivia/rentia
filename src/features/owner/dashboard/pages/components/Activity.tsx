import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import StatusPill from './StatusPill';
import { ROUTES } from '../../../../../shared/routes';

type ActivityContract = {
  id: string;
  createdAt: string;
  property: {
    title: string;
  };
};

type ActivityProps = {
  contracts: ActivityContract[];
};

const formatActivityDate = (date: string) => {
  const today = new Date();
  const eventDate = new Date(`${date}T12:00:00`);

  const isToday =
    today.getFullYear() === eventDate.getFullYear() &&
    today.getMonth() === eventDate.getMonth() &&
    today.getDate() === eventDate.getDate();

  if (isToday) {
    return 'Hoy';
  }

  return new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(eventDate);
};

const Activity = ({ contracts }: ActivityProps) => {
  const activityItems = [...contracts]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 4);

  return (
    <div className="mt-6 rounded-2xl border border-border bg-card shadow-soft">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h2 className="font-semibold">Actividad reciente</h2>

        <Link
          to={ROUTES.OWNER_CONTRACTS}
          className="
            flex
            items-center
            gap-1
            rounded-md
            px-3
            py-1.5
            text-sm
            transition
            hover:bg-accent
            hover:text-accent-foreground
          "
        >
          Ver contratos
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {activityItems.length === 0 ? (
        <p className="px-6 py-5 text-sm text-muted-foreground">
          Todavía no hay actividad registrada.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {activityItems.map((contract) => (
            <li key={contract.id} className="flex items-center gap-4 px-6 py-4">
              <StatusPill tone="primary">Sistema</StatusPill>

              <p className="flex-1 truncate text-sm">
                <span className="text-muted-foreground">generó el contrato de</span>{' '}
                <span className="font-medium">{contract.property.title}</span>
              </p>

              <span className="text-xs text-muted-foreground">
                {formatActivityDate(contract.createdAt)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Activity;
