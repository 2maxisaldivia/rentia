type IncomePoint = {
  label: string;
  value: number;
};

type MiniBarsProps = {
  data: IncomePoint[];
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);

const MiniBars = ({ data }: MiniBarsProps) => {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="mt-8">
      <div className="grid h-40 grid-cols-6 items-end gap-3 sm:gap-5">
        {data.map((item) => {
          const height = item.value > 0 ? Math.max((item.value / maxValue) * 100, 12) : 4;

          return (
            <div key={item.label} className="group flex h-full min-w-0 flex-col justify-end">
              <div className="relative flex flex-1 items-end">
                <span
                  className="
                    pointer-events-none
                    absolute
                    bottom-full
                    left-1/2
                    z-10
                    mb-2
                    -translate-x-1/2
                    whitespace-nowrap
                    rounded-md
                    bg-foreground
                    px-2
                    py-1
                    text-[10px]
                    text-background
                    opacity-0
                    transition
                    group-hover:opacity-100
                  "
                >
                  {formatPrice(item.value)}
                </span>

                <div
                  className={
                    item.value > 0
                      ? 'w-full rounded-t-md bg-primary transition-all duration-300'
                      : 'w-full rounded-t-md bg-muted'
                  }
                  style={{ height: `${height}%` }}
                />
              </div>

              <p className="mt-2 text-center text-xs text-muted-foreground">{item.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniBars;
