import { stats } from '../../utils/constants';
import StatusPill from './StatusPill';

const StatsSection = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary">
              <s.icon className="h-4 w-4" />
            </span>
            <StatusPill tone={s.tone}>{s.delta}</StatusPill>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{s.label}</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight">{s.value}</p>
        </div>
      ))}
    </div>
  );
};
export default StatsSection;
