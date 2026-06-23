import { MapPin } from 'lucide-react';
import PageHeader from '../../../owner/dashboard/pages/components/PageHeader';
import StatusPill from '../../../owner/dashboard/pages/components/StatusPill';
import { formatPrecio } from '../utils/formatPrice';
import { Link } from 'react-router-dom';
import { propiedades } from '../utils/constants';

const ExploreProperties = () => {
  return (
    <>
      <PageHeader
        title="Encontrá tu próximo alquiler"
        description="Propiedades publicadas directamente por sus dueños. Sin comisiones, con todo claro desde el primer contacto."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {propiedades.map((p) => {
          const disponible = p.estado === 'disponible';
          const Card = (
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={p.imagenes[0]}
                  alt={p.titulo}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute left-3 top-3">
                  <StatusPill tone={p.tone}>{p.estado}</StatusPill>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                  {p.tipo}
                </span>
                <h3 className="line-clamp-2 text-base font-semibold leading-snug">{p.titulo}</h3>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" /> {p.ubicacion}
                </p>
                <div className="mt-auto flex items-end justify-between pt-3">
                  <div>
                    <p className="text-lg font-semibold">{formatPrecio(p.precio)}</p>
                    <p className="text-[11px] text-muted-foreground">por mes</p>
                  </div>
                  {disponible && (
                    <span className="text-xs font-medium text-primary group-hover:underline">
                      Ver detalle →
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
          return disponible ? (
            <Link key={p.id} to="/propiedades/$id" className="block">
              {Card}
            </Link>
          ) : (
            <div key={p.id} className="cursor-not-allowed opacity-75">
              {Card}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default ExploreProperties;
