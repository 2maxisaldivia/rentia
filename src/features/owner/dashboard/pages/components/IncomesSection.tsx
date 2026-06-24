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
    <div className="min-w-0 rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-6 lg:col-span-2">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h2 className="font-semibold">Ingreso mensual estimado</h2>

          <p className="text-xs text-muted-foreground">Proyección de los próximos 6 meses</p>
        </div>

        <span
          className="
            inline-flex
            shrink-0
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
        <p className="break-words text-xl font-semibold tracking-tight sm:text-2xl">
          {formatPrice(currentMonthIncome)}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          Estimado para {projection[0]?.label ?? 'este mes'}
        </p>
      </div>

      <MiniBars data={projection} />
    </div>
  );
};

export default Incomes;
