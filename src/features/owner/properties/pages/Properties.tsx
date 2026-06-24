import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Plus } from 'lucide-react';

import PageHeader from '../../dashboard/pages/components/PageHeader';
import StatusPill from '../../dashboard/pages/components/StatusPill';
import { useUser } from '../../../../shared/auth/provider/useContextValue';
import { getOwnerProperties, type Property } from '../../../../services/property.service';
import { ROUTES } from '../../../../shared/routes';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);

const getStatusLabel = (status: Property['status']) => {
  return status === 'available' ? 'disponible' : 'alquilada';
};

const getStatusTone = (status: Property['status']) => {
  return status === 'available' ? 'success' : 'primary';
};

const Properties = () => {
  const { user } = useUser();

  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getOwnerProperties(user.id);

      setProperties(data);
      setIsLoading(false);
    };

    fetchProperties();
  }, [user.id]);

  return (
    <>
      <PageHeader
        title="Propiedades"
        description="Gestioná tu portfolio y agregá nuevas unidades."
        actions={
          <Link
            to={ROUTES.OWNER_PROPERTY_CREATE}
            className="
              flex
              items-center
              gap-2
              rounded-lg
              bg-primary
              px-4
              py-2
              text-sm
              font-medium
              text-primary-foreground
              transition
              hover:opacity-90
            "
          >
            <Plus className="h-4 w-4" />
            Agregar propiedad
          </Link>
        }
      />

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Cargando propiedades...</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <Link
              to={`/owner/properties/${p.id}`}
              key={p.id}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={p.images?.[0] ?? ''}
                  alt={p.title}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute left-3 top-3">
                  <StatusPill tone={getStatusTone(p.status)}>{getStatusLabel(p.status)}</StatusPill>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-semibold tracking-tight">{p.title}</h3>

                <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {p.location}
                </p>

                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-lg font-semibold">{formatPrice(p.price)}</span>

                  <span className="text-xs text-muted-foreground">/ mes</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Properties;
