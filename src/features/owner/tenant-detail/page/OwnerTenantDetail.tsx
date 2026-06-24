import { useEffect, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  BriefcaseBusiness,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

import PageHeader from '../../dashboard/pages/components/PageHeader';
import StatusPill from '../../dashboard/pages/components/StatusPill';
import { useUser } from '../../../../shared/auth/provider/useContextValue';
import { ROUTES } from '../../../../shared/routes';
import type { Contract } from '../../../../shared/types/Contract';
import { getContractById } from '../../../../services/contract.service';
import { downloadContractPdf } from '../../../../services/pdf.service';

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

const getInitials = (fullName: string) =>
  fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

const DetailCard = ({
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

const DetailItem = ({ label, value, icon }: { label: string; value: string; icon?: ReactNode }) => (
  <div>
    <dt className="text-xs text-muted-foreground">{label}</dt>
    <dd className="mt-1 flex items-start gap-2 break-words text-sm font-medium">
      {icon}
      <span>{value}</span>
    </dd>
  </div>
);

const DocumentLink = ({ label, url }: { label: string; url: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noreferrer"
    className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background p-4 text-sm font-medium transition hover:border-primary/40 hover:bg-accent"
  >
    <span className="flex min-w-0 items-center gap-3">
      <FileText className="h-4 w-4 shrink-0 text-primary" />
      <span className="truncate">{label}</span>
    </span>
    <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
  </a>
);

const OwnerTenantDetail = () => {
  const { contractId } = useParams<{ contractId: string }>();
  const { user } = useUser();

  const [contract, setContract] = useState<Contract | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchContract = async () => {
      if (!contractId) {
        setErrorMessage('No recibimos el identificador del contrato.');
        setIsLoading(false);
        return;
      }

      try {
        const contractData = await getContractById(contractId);

        if (!contractData) {
          setErrorMessage('No encontramos el contrato solicitado.');
          return;
        }

        if (contractData.ownerId !== user.id) {
          setErrorMessage('No tenés permiso para ver los datos de este inquilino.');
          return;
        }

        setContract(contractData);
      } catch (error) {
        console.error('Error obteniendo inquilino:', error);
        setErrorMessage('No pudimos cargar los datos del inquilino. Intentá nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContract();
  }, [contractId, user.id]);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Cargando datos del inquilino...</p>;
  }

  if (!contract) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-destructive">{errorMessage}</p>
        <Link
          to={ROUTES.OWNER_CONTRACTS}
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a contratos
        </Link>
      </div>
    );
  }

  const application = contract.rentalApplication;

  return (
    <>
      <Link
        to={ROUTES.OWNER_CONTRACTS}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a contratos
      </Link>

      <div className="mt-4">
        <PageHeader
          title="Información del inquilino"
          description={`Datos asociados al alquiler de ${contract.property.title}.`}
          actions={
            <button
              type="button"
              onClick={() => downloadContractPdf(contract)}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              <FileText className="h-4 w-4" />
              Descargar contrato
            </button>
          }
        />
      </div>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
              {getInitials(contract.tenant.fullName)}
            </div>
            <div>
              <p className="text-xl font-semibold">{contract.tenant.fullName}</p>
              <a
                href={`mailto:${contract.tenant.email}`}
                className="mt-1 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary hover:underline"
              >
                <Mail className="h-4 w-4" />
                {contract.tenant.email}
              </a>
            </div>
          </div>
          <StatusPill tone="success">Contrato activo</StatusPill>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <DetailCard title="Datos personales y laborales" icon={<UserRound className="h-5 w-5" />}>
          {application ? (
            <dl className="grid gap-5 sm:grid-cols-2">
              <DetailItem label="DNI" value={application.dni} />
              <DetailItem
                label="Teléfono"
                value={application.phone}
                icon={<Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />}
              />
              <DetailItem label="Estado civil" value={application.maritalStatus} />
              <DetailItem
                label="Ocupación"
                value={application.occupation}
                icon={<BriefcaseBusiness className="mt-0.5 h-4 w-4 shrink-0 text-primary" />}
              />
              <div className="sm:col-span-2">
                <DetailItem
                  label="Domicilio laboral"
                  value={
                    application.workAddressNotApplicable
                      ? 'No aplica (trabajo remoto o sin domicilio laboral)'
                      : (application.workAddress ?? 'No informado')
                  }
                  icon={<MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />}
                />
              </div>
            </dl>
          ) : (
            <p className="text-sm text-muted-foreground">
              Este contrato fue generado antes de incorporar la ficha ampliada del inquilino.
            </p>
          )}
        </DetailCard>

        <DetailCard title="Alquiler vinculado" icon={<MapPin className="h-5 w-5" />}>
          <dl className="grid gap-5 sm:grid-cols-2">
            <DetailItem label="Propiedad" value={contract.property.title} />
            <DetailItem label="Tipo" value={contract.property.type} />
            <div className="sm:col-span-2">
              <DetailItem label="Dirección" value={contract.property.address} />
            </div>
            <DetailItem label="Alquiler mensual" value={formatPrice(contract.monthlyAmount)} />
            <DetailItem
              label="Vigencia"
              value={`${formatDate(contract.startDate)} al ${formatDate(contract.endDate)}`}
            />
          </dl>
        </DetailCard>
      </div>

      {application && (
        <>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <DetailCard title="Documentación" icon={<FileText className="h-5 w-5" />}>
              <div className="space-y-3">
                <DocumentLink label="Foto del DNI" url={application.dniImageUrl} />
                <DocumentLink label="Recibo de sueldo 1" url={application.salaryReceiptUrls[0]} />
                <DocumentLink label="Recibo de sueldo 2" url={application.salaryReceiptUrls[1]} />
              </div>
            </DetailCard>

            <DetailCard title="Garantes" icon={<ShieldCheck className="h-5 w-5" />}>
              <div className="space-y-4">
                {application.guarantors.map((guarantor, index) => (
                  <div
                    key={`${guarantor.dni}-${index}`}
                    className="rounded-xl border border-border bg-secondary/20 p-4"
                  >
                    <p className="font-semibold">Garante {index + 1}</p>
                    <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                      <DetailItem label="Nombre y apellido" value={guarantor.fullName} />
                      <DetailItem label="DNI" value={guarantor.dni} />
                      <DetailItem label="Teléfono" value={guarantor.phone} />
                      <DetailItem label="Ocupación" value={guarantor.occupation} />
                    </dl>
                  </div>
                ))}
              </div>
            </DetailCard>
          </div>
        </>
      )}
    </>
  );
};

export default OwnerTenantDetail;
