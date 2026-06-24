import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, MapPin } from 'lucide-react';

import PageHeader from '../../../owner/dashboard/pages/components/PageHeader';
import StatusPill from '../../../owner/dashboard/pages/components/StatusPill';
import { getAvailableProperties, type Property } from '../../../../services/property.service';
import { ROUTES } from '../../../../shared/routes';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);

const ExploreProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getAvailableProperties();

      setProperties(data);
      setIsLoading(false);
    };

    fetchProperties();
  }, []);

  return (
    <>
      <PageHeader
        title="Encontrá tu próximo alquiler"
        description="Propiedades publicadas directamente por sus dueños. Sin comisiones, con todo claro desde el primer contacto."
      />

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Cargando propiedades...</p>
      ) : properties.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center shadow-soft">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
            <Building2 className="h-7 w-7" />
          </span>

          <h2 className="mt-5 text-lg font-semibold">
            No hay propiedades disponibles por el momento
          </h2>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Todas las propiedades publicadas se encuentran alquiladas o todavía no hay nuevas
            unidades disponibles. Volvé a consultar más tarde.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {properties.map((p) => (
            <Link
              key={p.id}
              to={ROUTES.TENANT_PROPERTY_DETAIL.replace(':id', p.id)}
              className="block"
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={p.images?.[0] ?? ''}
                    alt={p.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-3 top-3">
                    <StatusPill tone="success">Disponible</StatusPill>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-2 p-4">
                  <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    {p.type}
                  </span>

                  <h3 className="line-clamp-2 text-base font-semibold leading-snug">{p.title}</h3>

                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {p.location}
                  </p>

                  <div className="mt-auto flex items-end justify-between pt-3">
                    <div>
                      <p className="text-lg font-semibold">{formatPrice(p.price)}</p>

                      <p className="text-[11px] text-muted-foreground">por mes</p>
                    </div>

                    <span className="text-xs font-medium text-primary group-hover:underline">
                      Ver detalle →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default ExploreProperties;
