import { TrendingUp } from 'lucide-react';

import MiniBars from './MiniBars';

type IncomePoint = {
  label: string;
  value: number;
};

type IncomesProps = {
  projection: IncomePoint[];
  activeContracts: number;
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);

const Incomes = ({ projection, activeContracts }: IncomesProps) => {
  const currentMonthIncome = projection[0]?.value ?? 0;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold">Ingreso mensual estimado</h2>

          <p className="text-xs text-muted-foreground">Proyección de los próximos 6 meses</p>
        </div>

        <span
          className="
            inline-flex
            items-center
            gap-1
            text-sm
            text-success
          "
        >
          <TrendingUp className="h-4 w-4" />

          {activeContracts > 0 ? 'Al día' : 'Sin contratos'}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-2xl font-semibold tracking-tight">{formatPrice(currentMonthIncome)}</p>

        <p className="mt-1 text-xs text-muted-foreground">
          Estimado para {projection[0]?.label ?? 'este mes'}
        </p>
      </div>

      <MiniBars data={projection} />
    </div>
  );
};

export default Incomes;
