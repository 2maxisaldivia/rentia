import { Building2 } from 'lucide-react';
import StatusPill from './StatusPill';
import { upcoming } from '../../utils/constants';

const UpcomingSection = () => {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <ul className="mt-4 space-y-3">
        {upcoming.map((u) => (
          <li key={u.name} className="flex items-start gap-3 rounded-xl p-2 hover:bg-secondary/60">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-secondary text-foreground">
              <Building2 className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{u.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {u.tenant} · {u.amount}
              </p>
            </div>
            <StatusPill tone={u.tone}>{u.due}</StatusPill>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UpcomingSection;
