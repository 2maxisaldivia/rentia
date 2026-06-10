import { Building2 } from 'lucide-react';

const BrandPanel = () => {
  return (
    <div className="relative hidden bg-primary lg:block">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_60%)]" />
      <div className="relative flex h-full flex-col justify-between p-12 text-primary-foreground">
        <div />
        <div className="space-y-6">
          <Building2 className="h-10 w-10 opacity-70" />
          <p className="text-2xl font-medium leading-snug">
            "Dejé de perseguir alquileres por WhatsApp. Hoy todo está en Rentia, ordenado y con
            historial."
          </p>
          <div>
            <p className="text-sm font-medium">Lucía Méndez</p>
            <p className="text-xs text-primary-foreground/60">Propietaria · 6 unidades</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BrandPanel;
