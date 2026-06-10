import { Check } from 'lucide-react';
import { Logo } from '../../../../shared/components/Logo';

const MarketingPanel = () => {
  return (
    <div className="relative hidden bg-primary lg:block">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.12),transparent_60%)]" />

      <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
        <Logo logoClassName="text-primary-foreground" textClassName="text-primary-foreground" />

        <div className="space-y-4">
          <h2 className="text-3xl font-semibold leading-tight">
            Empezá a profesionalizar tus alquileres hoy.
          </h2>

          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {[
              'Contratos digitales con timeline',
              'Pagos con comprobante validado',
              'Notificaciones automáticas',
              'Mensajería con tus inquilinos',
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-primary-foreground/60">Trial 30 días · Sin tarjeta</p>
      </div>
    </div>
  );
};
export default MarketingPanel;
