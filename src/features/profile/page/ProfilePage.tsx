import { useEffect, useState, type ReactNode } from 'react';
import {
  BriefcaseBusiness,
  Building2,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

import PageHeader from '../../owner/dashboard/pages/components/PageHeader';
import StatusPill from '../../owner/dashboard/pages/components/StatusPill';
import { useUser } from '../../../shared/auth/provider/useContextValue';
import type { Contract, RentalApplication } from '../../../shared/types/Contract';
import { getOwnerContracts, getTenantContracts } from '../../../services/contract.service';
import { getOwnerProperties, type Property } from '../../../services/property.service';

type ProfileData = {
  contracts: Contract[];
  properties: Property[];
};

const getInitials = (firstName: string, lastName: string) =>
  `${firstName[0] ?? ''}${lastName[0] ?? ''}`.toUpperCase();

const ProfilePage = () => {
  const { user } = useUser();
  const [profileData, setProfileData] = useState<ProfileData>({
    contracts: [],
    properties: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchProfileData = async () => {
      try {
        const [contracts, properties] =
          user.role === 'owner'
            ? await Promise.all([getOwnerContracts(user.id), getOwnerProperties(user.id)])
            : [await getTenantContracts(user.id), []];

        if (isMounted) {
          setProfileData({ contracts, properties });
        }
      } catch (error) {
        console.error('Error cargando el perfil:', error);

        if (isMounted) {
          setErrorMessage('No pudimos cargar toda la información de tu perfil.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProfileData();

    return () => {
      isMounted = false;
    };
  }, [user.id, user.role]);

  const roleLabel = user.role === 'owner' ? 'Propietario' : 'Inquilino';
  const applications = profileData.contracts.filter(
    (contract) => contract.rentalApplication,
  );

  return (
    <>
      <PageHeader
        title="Mi perfil"
        description="Consultá tus datos personales y la información vinculada a tu cuenta."
      />

      <section className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
              {getInitials(user.firstName, user.lastName)}
            </div>

            <div className="min-w-0">
              <h1 className="break-words text-xl font-semibold">
                {user.firstName} {user.lastName}
              </h1>
              <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <UserRound className="h-4 w-4" />
                {roleLabel}
              </p>
            </div>
          </div>

          <StatusPill tone="success">Cuenta activa</StatusPill>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ProfileCard title="Datos de contacto" icon={<Mail className="h-5 w-5" />}>
          <dl className="space-y-5">
            <DetailItem label="Nombre" value={`${user.firstName} ${user.lastName}`} />
            <DetailItem
              label="Correo electrónico"
              value={user.email}
              href={`mailto:${user.email}`}
              icon={<Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />}
            />
            <DetailItem
              label="Teléfono"
              value={user.phone || 'No informado'}
              href={user.phone ? `tel:${user.phone}` : undefined}
              icon={<Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />}
            />
          </dl>
        </ProfileCard>

        <ProfileCard
          title={user.role === 'owner' ? 'Resumen como propietario' : 'Resumen como inquilino'}
          icon={<Building2 className="h-5 w-5" />}
        >
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Cargando resumen...</p>
          ) : (
            <dl className="grid gap-5 sm:grid-cols-2">
              {user.role === 'owner' ? (
                <>
                  <DetailItem
                    label="Propiedades publicadas"
                    value={String(profileData.properties.length)}
                  />
                  <DetailItem
                    label="Contratos activos"
                    value={String(profileData.contracts.length)}
                  />
                </>
              ) : (
                <>
                  <DetailItem
                    label="Alquileres activos"
                    value={String(profileData.contracts.length)}
                  />
                  <DetailItem
                    label="Fichas con garantes"
                    value={String(applications.length)}
                  />
                </>
              )}
            </dl>
          )}
        </ProfileCard>
      </div>

      {errorMessage && (
        <p role="alert" className="mt-6 text-sm text-destructive">
          {errorMessage}
        </p>
      )}

      {user.role === 'tenant' && !isLoading && (
        <section className="mt-6">
          <div>
            <h2 className="text-lg font-semibold">Información presentada para alquilar</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Estos datos provienen de tus solicitudes de alquiler y pueden variar entre contratos.
            </p>
          </div>

          {applications.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-border bg-card p-6 text-sm text-muted-foreground shadow-soft">
              Todavía no tenés una ficha de alquiler con documentación y garantes.
            </div>
          ) : (
            <div className="mt-4 space-y-6">
              {applications.map((contract) => (
                <ApplicationProfile
                  key={contract.id}
                  propertyTitle={contract.property.title}
                  application={contract.rentalApplication!}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
};

const ApplicationProfile = ({
  propertyTitle,
  application,
}: {
  propertyTitle: string;
  application: RentalApplication;
}) => (
  <article className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Ficha vinculada a
      </p>
      <h3 className="mt-1 break-words font-semibold">{propertyTitle}</h3>
    </div>

    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <div>
        <h4 className="flex items-center gap-2 font-medium">
          <BriefcaseBusiness className="h-4 w-4 text-primary" />
          Datos personales y laborales
        </h4>

        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <DetailItem label="DNI" value={application.dni} />
          <DetailItem label="Teléfono informado" value={application.phone} />
          <DetailItem label="Estado civil" value={application.maritalStatus} />
          <DetailItem label="Ocupación" value={application.occupation} />
          <div className="sm:col-span-2">
            <DetailItem
              label="Domicilio laboral"
              value={
                application.workAddressNotApplicable
                  ? 'No aplica'
                  : (application.workAddress ?? 'No informado')
              }
              icon={<MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />}
            />
          </div>
        </dl>

        <div className="mt-5 grid gap-2 sm:grid-cols-3">
          <DocumentLink label="DNI" url={application.dniImageUrl} />
          <DocumentLink label="Recibo 1" url={application.salaryReceiptUrls[0]} />
          <DocumentLink label="Recibo 2" url={application.salaryReceiptUrls[1]} />
        </div>
      </div>

      <div>
        <h4 className="flex items-center gap-2 font-medium">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Garantes
        </h4>

        <div className="mt-4 space-y-3">
          {application.guarantors.map((guarantor, index) => (
            <div
              key={`${guarantor.dni}-${index}`}
              className="rounded-xl border border-border bg-secondary/20 p-4"
            >
              <p className="font-medium">Garante {index + 1}</p>
              <dl className="mt-3 grid gap-3 sm:grid-cols-2">
                <DetailItem label="Nombre" value={guarantor.fullName} />
                <DetailItem label="DNI" value={guarantor.dni} />
                <DetailItem label="Teléfono" value={guarantor.phone} />
                <DetailItem label="Ocupación" value={guarantor.occupation} />
              </dl>
            </div>
          ))}
        </div>
      </div>
    </div>
  </article>
);

const ProfileCard = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) => (
  <section className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-primary-soft p-2 text-primary">{icon}</div>
      <h2 className="font-semibold">{title}</h2>
    </div>
    <div className="mt-5">{children}</div>
  </section>
);

const DetailItem = ({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href?: string;
  icon?: ReactNode;
}) => (
  <div>
    <dt className="text-xs text-muted-foreground">{label}</dt>
    <dd className="mt-1 flex items-start gap-2 break-words text-sm font-medium">
      {icon}
      {href ? (
        <a href={href} className="break-all text-primary hover:underline">
          {value}
        </a>
      ) : (
        <span>{value}</span>
      )}
    </dd>
  </div>
);

const DocumentLink = ({ label, url }: { label: string; url: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center justify-between gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium transition hover:bg-accent"
  >
    <span className="inline-flex items-center gap-2">
      <FileText className="h-3.5 w-3.5 text-primary" />
      {label}
    </span>
    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
  </a>
);

export default ProfilePage;
