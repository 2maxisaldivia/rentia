import { useEffect, useState } from 'react';
import { ArrowLeft, Wallet } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import StatusPill from '../../../owner/dashboard/pages/components/StatusPill';
import { ROUTES } from '../../../../shared/routes';
import Card from '../components/Card';

import { getPropertyById, type Property } from '../../../../services/property.service';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);

const TenantPropertyDetail = () => {
  const { id } = useParams<{ id: string }>();

  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await getPropertyById(id);

        setProperty(data);
      } catch (error) {
        console.error('Error obteniendo propiedad:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Cargando propiedad...</p>;
  }

  if (!property) {
    return <p className="text-sm text-muted-foreground">No encontramos esta propiedad.</p>;
  }

  const disponible = property.status === 'available';

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
            src={property.images?.[0]}
            alt={property.title}
            className="h-full max-h-[480px] w-full object-cover"
          />
        </div>

        {property.images?.slice(1).map((src) => (
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
              className="
                aspect-[4/3]
                w-full
                object-cover
              "
            />
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-4">
        {/* Descripción */}

        <div className="lg:col-span-2">
          <Card title="Descripción">
            <p className="text-sm text-muted-foreground">{property.description}</p>
          </Card>
        </div>

        {/* Estado */}

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

        {/* Alquiler */}

        <div>
          <Card title="Alquiler mensual">
            <p className="text-2xl font-semibold">{formatPrice(property.price)}</p>

            <button
              disabled={!disponible}
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
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              <Wallet className="h-4 w-4" />

              {disponible ? 'Solicitar alquiler' : 'No disponible'}
            </button>
          </Card>
        </div>
      </div>
    </>
  );
};

export default TenantPropertyDetail;
