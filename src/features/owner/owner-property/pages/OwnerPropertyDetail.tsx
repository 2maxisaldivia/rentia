import { useEffect, useState } from 'react';
import { ArrowLeft, FileText, MapPin, MessageSquare } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import PageHeader from '../../dashboard/pages/components/PageHeader';
import StatusPill from '../../dashboard/pages/components/StatusPill';

import { useUser } from '../../../../shared/auth/provider/useContextValue';
import { ROUTES } from '../../../../shared/routes';

import { getPropertyById, type Property } from '../../../../services/property.service';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);

const OwnerPropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();

  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        setErrorMessage('No recibimos el identificador de la propiedad.');
        setIsLoading(false);
        return;
      }

      try {
        const data = await getPropertyById(id);

        if (!data) {
          setErrorMessage('No encontramos esta propiedad.');
          return;
        }

        if (data.ownerId !== user.id) {
          setErrorMessage('No tenés permiso para ver esta propiedad.');
          return;
        }

        setProperty(data);
      } catch (error) {
        console.error('Error obteniendo propiedad:', error);
        setErrorMessage('Ocurrió un error al cargar la propiedad. Intentá nuevamente.');
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
        <p className="text-sm text-muted-foreground">{errorMessage}</p>

        <Link
          to={ROUTES.OWNER_PROPERTIES}
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a propiedades
        </Link>
      </div>
    );
  }

  const disponible = property.status === 'available';

  const statusLabel = disponible ? 'Disponible' : 'Alquilada';

  const images = property.images && property.images.length > 0 ? property.images : [FALLBACK_IMAGE];

  return (
    <>
      <Link
        to={ROUTES.OWNER_PROPERTIES}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a propiedades
      </Link>

      <PageHeader
        title={property.title}
        description={`${property.type} · ${property.location}`}
        actions={
          <>
            <button
              type="button"
              disabled={!property.tenantId}
              className="
                flex
                items-center
                gap-2
                rounded-lg
                border border-border
                bg-background
                px-4
                py-2
                text-sm
                font-medium
                transition
                hover:bg-accent
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <MessageSquare className="h-4 w-4" />
              Contactar inquilino
            </button>

            <button
              type="button"
              disabled={!property.tenantId}
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
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <FileText className="h-4 w-4" />
              Ver contrato
            </button>
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-4">
        <div className="overflow-hidden rounded-2xl border border-border lg:col-span-2 lg:row-span-2">
          <img
            src={images[0]}
            alt={property.title}
            className="h-full max-h-[480px] w-full object-cover"
          />
        </div>

        {images.slice(1, 4).map((src) => (
          <div key={src} className="overflow-hidden rounded-2xl border border-border">
            <img
              src={src}
              alt={property.title}
              loading="lazy"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Card title="Descripción">
            <p className="text-sm text-muted-foreground">{property.description}</p>

            <div className="mt-5 flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{property.address}</span>
            </div>
          </Card>
        </div>

        <Card title="Estado">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Situación</span>

            <StatusPill tone="success">{statusLabel}</StatusPill>
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            {disponible
              ? 'La propiedad está visible para inquilinos interesados.'
              : 'La propiedad tiene un inquilino asignado.'}
          </p>
        </Card>

        <Card title="Inquilino">
          {property.tenantId ? (
            <>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  IN
                </div>

                <div>
                  <p className="text-sm font-semibold">Inquilino asignado</p>

                  <p className="text-xs text-muted-foreground">El contrato está activo</p>
                </div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Los datos completos del inquilino se mostrarán al integrar la colección de
                contratos.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium">Sin inquilino asignado</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Esta propiedad todavía está disponible para alquilar.
              </p>
            </>
          )}
        </Card>
      </div>

      <div className="mt-6">
        <Card title="Resumen">
          <div className="grid gap-4 sm:grid-cols-3">
            <InfoItem label="Alquiler mensual" value={formatPrice(property.price)} />

            <InfoItem label="Estado" value={statusLabel} />

            <InfoItem label="Ubicación" value={property.location} />
          </div>
        </Card>
      </div>
    </>
  );
};

export default OwnerPropertyDetail;

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h3 className="font-semibold">{title}</h3>

      <div className="mt-4">{children}</div>
    </section>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary/50 p-4">
      <p className="text-xs text-muted-foreground">{label}</p>

      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}
