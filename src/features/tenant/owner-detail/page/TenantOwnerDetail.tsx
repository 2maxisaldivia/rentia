import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  UserRound,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import PageHeader from '../../../owner/dashboard/pages/components/PageHeader';
import StatusPill from '../../../owner/dashboard/pages/components/StatusPill';
import { useUser } from '../../../../shared/auth/provider/useContextValue';
import { ROUTES } from '../../../../shared/routes';
import type { AppUser } from '../../../../shared/auth/user';
import type { Contract } from '../../../../shared/types/Contract';
import { getContractByPropertyId } from '../../../../services/contract.service';
import { getPropertyById, type Property } from '../../../../services/property.service';
import { getUserProfile } from '../../../../services/user.service';

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

const getInitials = (owner: AppUser) =>
  `${owner.firstName[0] ?? ''}${owner.lastName[0] ?? ''}`.toUpperCase();

const TenantOwnerDetail = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const { user } = useUser();

  const [property, setProperty] = useState<Property | null>(null);
  const [owner, setOwner] = useState<AppUser | null>(null);
  const [contract, setContract] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchOwnerData = async () => {
      if (!propertyId) {
        setErrorMessage('No recibimos el identificador de la propiedad.');
        setIsLoading(false);
        return;
      }

      try {
        const propertyData = await getPropertyById(propertyId);

        if (!propertyData) {
          setErrorMessage('No encontramos esta propiedad.');
          return;
        }

        if (propertyData.status === 'rented' && propertyData.tenantId !== user.id) {
          setErrorMessage('No tenés permiso para ver los datos de esta propiedad.');
          return;
        }

        const [ownerData, contractData] = await Promise.all([
          getUserProfile(propertyData.ownerId),
          propertyData.status === 'rented'
            ? getContractByPropertyId(propertyData.id)
            : Promise.resolve(null),
        ]);

        if (!ownerData || ownerData.role !== 'owner') {
          setErrorMessage('No encontramos los datos del propietario.');
          return;
        }

        setProperty(propertyData);
        setOwner(ownerData);
        setContract(contractData);
      } catch (error) {
        console.error('Error obteniendo propietario:', error);
        setErrorMessage('No pudimos cargar los datos del propietario. Intentá nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOwnerData();
  }, [propertyId, user.id]);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Cargando propietario...</p>;
  }

  if (!property || !owner) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-destructive">{errorMessage}</p>
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

  return (
    <>
      <Link
        to={`/tenant/properties/${property.id}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a la propiedad
      </Link>

      <div className="mt-4">
        <PageHeader
          title="Perfil del propietario"
          description={`Datos de contacto del propietario de ${property.title}.`}
        />
      </div>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
              {getInitials(owner)}
            </div>
            <div>
              <p className="text-xl font-semibold">
                {owner.firstName} {owner.lastName}
              </p>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <UserRound className="h-4 w-4" />
                Propietario
              </p>
            </div>
          </div>
          <StatusPill tone="success">Propietario registrado</StatusPill>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary-soft p-2 text-primary">
              <Mail className="h-5 w-5" />
            </div>
            <h2 className="font-semibold">Datos de contacto</h2>
          </div>

          <dl className="mt-5 space-y-5">
            <div>
              <dt className="text-xs text-muted-foreground">Nombre y apellido</dt>
              <dd className="mt-1 text-sm font-medium">
                {owner.firstName} {owner.lastName}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Correo electrónico</dt>
              <dd className="mt-1">
                <a
                  href={`mailto:${owner.email}`}
                  className="inline-flex items-center gap-2 break-all text-sm font-medium text-primary hover:underline"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {owner.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Teléfono de contacto</dt>
              <dd className="mt-1">
                {owner.phone ? (
                  <a
                    href={`tel:${owner.phone}`}
                    className="inline-flex items-center gap-2 break-all text-sm font-medium text-primary hover:underline"
                  >
                    <Phone className="h-4 w-4 shrink-0" />
                    {owner.phone}
                  </a>
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">
                    No informado
                  </span>
                )}
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary-soft p-2 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <h2 className="font-semibold">Propiedad vinculada</h2>
          </div>

          <dl className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">Propiedad</dt>
              <dd className="mt-1 text-sm font-medium">{property.title}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Tipo</dt>
              <dd className="mt-1 text-sm font-medium">{property.type}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs text-muted-foreground">Dirección</dt>
              <dd className="mt-1 flex items-start gap-2 text-sm font-medium">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {property.address}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Alquiler mensual</dt>
              <dd className="mt-1 text-sm font-medium">{formatPrice(property.price)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Estado</dt>
              <dd className="mt-1 text-sm font-medium">
                {property.status === 'available' ? 'Disponible' : 'Alquilada'}
              </dd>
            </div>
          </dl>
        </section>
      </div>

      {contract && contract.tenantId === user.id && (
        <section className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary-soft p-2 text-primary">
              <CalendarDays className="h-5 w-5" />
            </div>
            <h2 className="font-semibold">Contrato compartido</h2>
          </div>

          <dl className="mt-5 grid gap-5 sm:grid-cols-3">
            <div>
              <dt className="text-xs text-muted-foreground">Inicio</dt>
              <dd className="mt-1 text-sm font-medium">{formatDate(contract.startDate)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Finalización</dt>
              <dd className="mt-1 text-sm font-medium">{formatDate(contract.endDate)}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Estado</dt>
              <dd className="mt-1 text-sm font-medium">Activo</dd>
            </div>
          </dl>
        </section>
      )}
    </>
  );
};

export default TenantOwnerDetail;
