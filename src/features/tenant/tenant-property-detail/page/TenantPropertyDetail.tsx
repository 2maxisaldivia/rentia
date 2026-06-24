import { useEffect, useState } from 'react';
import { ArrowLeft, UserRound, Wallet } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import StatusPill from '../../../owner/dashboard/pages/components/StatusPill';
import { ROUTES } from '../../../../shared/routes';
import { useUser } from '../../../../shared/auth/provider/useContextValue';
import type { AppUser } from '../../../../shared/auth/user';
import Card from '../components/Card';

import { getPropertyById, type Property } from '../../../../services/property.service';
import { getUserProfile } from '../../../../services/user.service';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);

const TenantPropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();

  const [property, setProperty] = useState<Property | null>(null);
  const [owner, setOwner] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await getPropertyById(id);

        if (!data) {
          setErrorMessage('No encontramos esta propiedad.');
          return;
        }

        if (data.status === 'rented' && data.tenantId !== user.id) {
          setErrorMessage('Esta propiedad ya no se encuentra disponible.');
          return;
        }

        const ownerData = await getUserProfile(data.ownerId);

        setProperty(data);
        setOwner(ownerData);
      } catch (error) {
        console.error('Error obteniendo propiedad:', error);
        setErrorMessage('No pudimos cargar la propiedad. Intentá nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id, user.id]);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Cargando propiedad...</p>;
  }

  if (!property) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {errorMessage || 'No encontramos esta propiedad.'}
        </p>

        <Link
          to={ROUTES.TENANT_EXPLORE}
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a explorar propiedades
        </Link>
      </div>
    );
  }

  const disponible = property.status === 'available';

  const images = property.images && property.images.length > 0 ? property.images : [FALLBACK_IMAGE];

  return (
    <>
      <Link
        to={ROUTES.TENANT_EXPLORE}
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          text-muted-foreground
          transition
          hover:text-foreground
        "
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a explorar propiedades
      </Link>

      <div className="mt-4 flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight">{property.title}</h1>

        <p className="text-sm text-muted-foreground">
          {property.type} · {property.location}
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        <div
          className="
            overflow-hidden
            rounded-2xl
            border border-border
            lg:col-span-2
            lg:row-span-2
          "
        >
          <img
            src={images[0]}
            alt={property.title}
            className="h-full max-h-[480px] w-full object-cover"
          />
        </div>

        {images.slice(1, 4).map((src) => (
          <div
            key={src}
            className="
              overflow-hidden
              rounded-2xl
              border border-border
            "
          >
            <img
              src={src}
              alt={property.title}
              loading="lazy"
              className="
                aspect-[4/3]
                h-full
                w-full
                object-cover
              "
            />
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Card title="Descripción">
            <p className="text-sm text-muted-foreground">{property.description}</p>
          </Card>
        </div>

        <div>
          <Card title="Estado">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Disponibilidad</span>

              <StatusPill tone={disponible ? 'success' : 'warning'}>
                {disponible ? 'Disponible' : 'Alquilada'}
              </StatusPill>
            </div>
          </Card>
        </div>

        <div>
          <Card title="Propietario">
            {owner ? (
              <Link
                to={`/tenant/properties/${property.id}/owner`}
                className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-accent"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <UserRound className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-primary group-hover:underline">
                    {owner.firstName} {owner.lastName}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{owner.email}</p>
                </div>
              </Link>
            ) : (
              <p className="text-sm text-muted-foreground">
                No pudimos cargar los datos del propietario.
              </p>
            )}
          </Card>
        </div>

        <div>
          <Card title="Alquiler mensual">
            <p className="text-2xl font-semibold">{formatPrice(property.price)}</p>

            {disponible ? (
              <Link
                to={`/tenant/properties/${property.id}/apply`}
                className="
                  mt-5
                  flex
                  w-full
                  items-center
                  justify-center
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
                <Wallet className="h-4 w-4" />
                Solicitar alquiler
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="mt-5 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-60"
              >
                <Wallet className="h-4 w-4" />
                No disponible
              </button>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default TenantPropertyDetail;
