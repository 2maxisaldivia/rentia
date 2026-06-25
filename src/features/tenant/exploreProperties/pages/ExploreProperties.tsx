import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, CalendarDays, MapPin } from 'lucide-react';

import PageHeader from '../../../owner/dashboard/pages/components/PageHeader';
import StatusPill from '../../../owner/dashboard/pages/components/StatusPill';
import { getAvailableProperties, type Property } from '../../../../services/property.service';
import { ROUTES } from '../../../../shared/routes';
import { useTenantRentals } from '../../shared/hooks/useTenantRentals';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`));

const ExploreProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { rentals } = useTenantRentals();

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

      {rentals.length > 0 && (
        <section className="mb-6 rounded-2xl border border-primary/20 bg-primary-soft/50 p-4 shadow-soft">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-primary">
                {rentals.length === 1 ? 'Tu alquiler actual' : 'Tus alquileres actuales'}
              </p>
              <h2 className="mt-1 font-semibold">
                {rentals.length === 1
                  ? 'Tenés una propiedad alquilada'
                  : `Tenés ${rentals.length} propiedades alquiladas`}
              </h2>
            </div>

            <Link
              to={ROUTES.TENANT_RENTAL}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Ver mis alquileres
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {rentals.map(({ contract, property: rentedProperty }) => (
              <Link
                key={contract.id}
                to={ROUTES.TENANT_RENTAL}
                className="group flex min-w-0 items-center gap-3 rounded-xl border border-border/70 bg-background/80 p-3 transition hover:border-primary/30"
              >
                <img
                  src={rentedProperty?.images?.[0] ?? FALLBACK_IMAGE}
                  alt={contract.property.title}
                  className="h-16 w-16 shrink-0 rounded-lg bg-muted object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-semibold">{contract.property.title}</h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{contract.property.location}</span>
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                    Hasta {formatDate(contract.endDate)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

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
