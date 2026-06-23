import { TrendingUp } from 'lucide-react';
import MiniBars from './MiniBars';
<div className="mt-6 grid gap-6 lg:grid-cols-3"></div>;
const Incomes = () => {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold">Ingresos por mes</h2>
          <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
        </div>
        <span className="inline-flex items-center gap-1 text-sm text-success">
          <TrendingUp className="h-4 w-4" /> +12,4%
        </span>
      </div>
      <MiniBars />
    </div>
  );
};
export default Incomes;
