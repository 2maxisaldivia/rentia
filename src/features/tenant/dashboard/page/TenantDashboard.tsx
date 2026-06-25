import {
  ArrowRight,
  Building2,
  CalendarDays,
  FileText,
  MapPin,
  Search,
  UserRound,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import PageHeader from '../../../owner/dashboard/pages/components/PageHeader';
import StatusPill from '../../../owner/dashboard/pages/components/StatusPill';
import { useUser } from '../../../../shared/auth/provider/useContextValue';
import { ROUTES } from '../../../../shared/routes';
import {
  useTenantRentals,
  type TenantRental,
} from '../../shared/hooks/useTenantRentals';

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
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`));

const getRemainingDays = (endDate: string) => {
  const today = new Date();
  const contractEnd = new Date(`${endDate}T12:00:00`);

  today.setHours(0, 0, 0, 0);

  return Math.ceil((contractEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

const TenantDashboard = () => {
  const { user } = useUser();
  const { rentals, isLoading, errorMessage } = useTenantRentals();

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Cargando tus alquileres...</p>;
  }

  return (
    <>
      <PageHeader
        title="Mis alquileres"
        description={`Hola, ${user?.firstName ?? 'inquilino'}. Acá podés consultar la información de todas las propiedades que alquilás.`}
      />

      {errorMessage ? (
        <p role="alert" className="text-sm text-destructive">
          {errorMessage}
        </p>
      ) : rentals.length === 0 ? (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center shadow-soft">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary">
            <Building2 className="h-7 w-7" />
          </span>

          <h2 className="mt-5 text-lg font-semibold">Todavía no tenés un alquiler activo</h2>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Cuando alquiles una propiedad, acá vas a encontrar su información y la vigencia de tu
            contrato.
          </p>

          <Link
            to={ROUTES.TENANT_EXPLORE}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            <Search className="h-4 w-4" />
            Explorar propiedades
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-8">
            {rentals.map((rental, index) => (
              <RentalSection
                key={rental.contract.id}
                rental={rental}
                position={index + 1}
                total={rentals.length}
              />
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="font-semibold">¿Querés ver otras opciones?</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Podés seguir consultando las propiedades disponibles en Rentia.
              </p>
            </div>

            <Link
              to={ROUTES.TENANT_EXPLORE}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-accent"
            >
              <Search className="h-4 w-4" />
              Seguir explorando
            </Link>
          </div>
        </>
      )}
    </>
  );
};

const RentalSection = ({
  rental,
  position,
  total,
}: {
  rental: TenantRental;
  position: number;
  total: number;
}) => {
  const { contract, property } = rental;
  const remainingDays = getRemainingDays(contract.endDate);

  return (
    <section className="min-w-0">
      {total > 1 && (
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Alquiler {position} de {total}
        </p>
      )}

      <div className="grid min-w-0 gap-6 lg:grid-cols-3">
        <article className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card shadow-soft lg:col-span-2">
          <div className="grid md:grid-cols-[minmax(14rem,0.9fr)_minmax(0,1.1fr)]">
            <img
              src={property?.images?.[0] ?? FALLBACK_IMAGE}
              alt={contract.property.title}
              className="aspect-[16/10] h-full max-h-80 w-full object-cover md:aspect-auto"
            />

            <div className="flex min-w-0 flex-col p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Propiedad alquilada
                  </p>

                  <h2 className="mt-1 break-words text-xl font-semibold">
                    {contract.property.title}
                  </h2>
                </div>

                <StatusPill tone="success">Alquiler activo</StatusPill>
              </div>

              <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="break-words">
                  {contract.property.address} · {contract.property.location}
                </span>
              </p>

              {property?.description && (
                <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">
                  {property.description}
                </p>
              )}

              <div className="mt-auto flex flex-wrap gap-3 pt-6">
                <Link
                  to={ROUTES.TENANT_PROPERTY_DETAIL.replace(':id', contract.propertyId)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Ver propiedad
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to={ROUTES.TENANT_OWNER_DETAIL.replace(':propertyId', contract.propertyId)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Ver propietario
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </article>

        <aside className="min-w-0 rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Contrato
              </p>
              <h2 className="mt-1 font-semibold">Vigencia actual</h2>
            </div>

            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
              <FileText className="h-5 w-5" />
            </span>
          </div>

          <dl className="mt-6 space-y-4">
            <div>
              <dt className="text-xs text-muted-foreground">Finaliza</dt>
              <dd className="mt-1 font-semibold">{formatDate(contract.endDate)}</dd>
              <p className="mt-1 text-xs text-muted-foreground">
                {remainingDays > 0
                  ? `${remainingDays} días restantes`
                  : remainingDays === 0
                    ? 'Vence hoy'
                    : 'Contrato vencido'}
              </p>
            </div>

            <div>
              <dt className="text-xs text-muted-foreground">Alquiler mensual</dt>
              <dd className="mt-1 break-words text-2xl font-semibold">
                {formatPrice(contract.monthlyAmount)}
              </dd>
            </div>
          </dl>

          <Link
            to={ROUTES.TENANT_CONTRACTS}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Ver contrato
            <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          icon={CalendarDays}
          label="Inicio del contrato"
          value={formatDate(contract.startDate)}
        />
        <InfoCard
          icon={Wallet}
          label="Alquiler mensual"
          value={formatPrice(contract.monthlyAmount)}
        />
        <InfoCard
          icon={UserRound}
          label="Propietario"
          value={contract.owner.fullName}
          detail={contract.owner.email}
        />
        <InfoCard
          icon={MapPin}
          label="Ubicación"
          value={contract.property.location}
          detail={contract.property.type}
        />
      </div>
    </section>
  );
};

const InfoCard = ({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail?: string;
}) => (
  <div className="min-w-0 rounded-2xl border border-border bg-card p-5 shadow-soft">
    <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary">
      <Icon className="h-4 w-4" />
    </span>

    <p className="mt-4 text-xs text-muted-foreground">{label}</p>
    <p className="mt-1 break-words font-semibold">{value}</p>
    {detail && <p className="mt-1 break-words text-xs text-muted-foreground">{detail}</p>}
  </div>
);

export default TenantDashboard;
