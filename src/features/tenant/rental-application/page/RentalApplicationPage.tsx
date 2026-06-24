import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import {
  ArrowLeft,
  BriefcaseBusiness,
  FileCheck2,
  MapPin,
  Send,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import PageHeader from '../../../owner/dashboard/pages/components/PageHeader';
import StatusPill from '../../../owner/dashboard/pages/components/StatusPill';
import { useUser } from '../../../../shared/auth/provider/useContextValue';
import { ROUTES } from '../../../../shared/routes';
import type { RentalApplication, RentalGuarantor } from '../../../../shared/types/Contract';
import { createRentalContract } from '../../../../services/contract.service';
import { downloadContractPdf } from '../../../../services/pdf.service';
import { getPropertyById, type Property } from '../../../../services/property.service';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200';

const OCCUPATION_OPTIONS = [
  'Empleado/a en relación de dependencia',
  'Trabajador/a independiente',
  'Monotributista',
  'Jubilado/a o pensionado/a',
  'Estudiante',
  'Desempleado/a',
  'Otro',
];

const MARITAL_STATUS_OPTIONS = [
  'Soltero/a',
  'Casado/a',
  'Unión convivencial',
  'Divorciado/a',
  'Viudo/a',
  'Otro',
];

const inputClassName =
  'w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground disabled:opacity-80';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);

type SectionProps = {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
};

const FormSection = ({ icon, title, description, children }: SectionProps) => (
  <section className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
    <div className="flex items-start gap-3">
      <div className="rounded-xl bg-primary-soft p-2 text-primary">{icon}</div>

      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>

    <div className="mt-6">{children}</div>
  </section>
);

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'tel' | 'url';
  placeholder?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  inputMode?: 'numeric' | 'tel' | 'url' | 'text';
  pattern?: string;
};

const TextField = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  hint,
  disabled = false,
  required = true,
  inputMode,
  pattern,
}: TextFieldProps) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium">
      {label}
    </label>

    <input
      id={id}
      name={id}
      type={type}
      required={required}
      disabled={disabled}
      value={value}
      onChange={onChange ? (event) => onChange(event.target.value) : undefined}
      placeholder={placeholder}
      inputMode={inputMode}
      pattern={pattern}
      className={inputClassName}
    />

    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

type SelectFieldProps = {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

const SelectField = ({ id, label, value, options, onChange }: SelectFieldProps) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium">
      {label}
    </label>

    <select
      id={id}
      name={id}
      required
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={inputClassName}
    >
      <option value="">Seleccioná una opción</option>

      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const emptyGuarantor = (): RentalGuarantor => ({
  fullName: '',
  dni: '',
  phone: '',
  occupation: '',
});

const initialApplication = (): RentalApplication => ({
  dni: '',
  dniImageUrl: '',
  occupation: '',
  workAddress: '',
  workAddressNotApplicable: false,
  phone: '',
  maritalStatus: '',
  salaryReceiptUrls: ['', ''],
  guarantors: [emptyGuarantor(), emptyGuarantor()],
});

const RentalApplicationPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUser();

  const [property, setProperty] = useState<Property | null>(null);
  const [application, setApplication] = useState<RentalApplication>(initialApplication);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) {
        setErrorMessage('No recibimos el identificador de la propiedad.');
        setIsLoading(false);
        return;
      }

      try {
        const propertyData = await getPropertyById(id);

        if (!propertyData) {
          setErrorMessage('No encontramos esta propiedad.');
          return;
        }

        setProperty(propertyData);
      } catch (error) {
        console.error('Error obteniendo propiedad:', error);
        setErrorMessage('No pudimos cargar la propiedad. Intentá nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const updateApplication = <Key extends keyof RentalApplication>(
    field: Key,
    value: RentalApplication[Key],
  ) => {
    setApplication((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateGuarantor = (index: 0 | 1, field: keyof RentalGuarantor, value: string) => {
    setApplication((current) => {
      const guarantors = current.guarantors.map((guarantor, guarantorIndex) =>
        guarantorIndex === index ? { ...guarantor, [field]: value } : guarantor,
      ) as RentalApplication['guarantors'];

      return {
        ...current,
        guarantors,
      };
    });
  };

  const updateSalaryReceipt = (index: 0 | 1, value: string) => {
    setApplication((current) => {
      const salaryReceiptUrls: RentalApplication['salaryReceiptUrls'] = [
        ...current.salaryReceiptUrls,
      ];

      salaryReceiptUrls[index] = value;

      return {
        ...current,
        salaryReceiptUrls,
      };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!property || property.status !== 'available') {
      setErrorMessage('Esta propiedad ya no se encuentra disponible.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const contract = await createRentalContract({
        propertyId: property.id,
        tenant: user,
        rentalApplication: application,
      });

      downloadContractPdf(contract);
      navigate(ROUTES.TENANT_CONTRACTS);
    } catch (error) {
      console.error('Error solicitando alquiler:', error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'No pudimos generar el contrato. Intentá nuevamente.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Cargando solicitud...</p>;
  }

  if (!property) {
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

  if (property.status !== 'available') {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
        <h1 className="text-xl font-semibold">La propiedad ya no está disponible</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Otro inquilino pudo haber completado la solicitud antes que vos.
        </p>
        <Link
          to={ROUTES.TENANT_EXPLORE}
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Ver otras propiedades
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
        Volver al detalle
      </Link>

      <div className="mt-4">
        <PageHeader
          title="Solicitud de alquiler"
          description="Completá la información requerida. El contrato se generará recién cuando confirmes este formulario."
        />
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormSection
            icon={<UserRound className="h-5 w-5" />}
            title="Datos personales"
            description="Tu nombre proviene de la cuenta y no puede modificarse desde esta solicitud."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <TextField
                id="fullName"
                label="Nombre y apellido"
                value={`${user.firstName} ${user.lastName}`.trim()}
                disabled
              />

              <TextField id="email" label="Correo electrónico" value={user.email} disabled />

              <TextField
                id="dni"
                label="DNI"
                value={application.dni}
                onChange={(value) => updateApplication('dni', value)}
                placeholder="Ej. 32123456"
                inputMode="numeric"
                pattern="[0-9. -]{7,12}"
                hint="Ingresalo sin letras. Podés usar puntos o escribirlo seguido."
              />

              <TextField
                id="dniImageUrl"
                label="URL de la foto del DNI"
                type="url"
                value={application.dniImageUrl}
                onChange={(value) => updateApplication('dniImageUrl', value)}
                placeholder="https://..."
                inputMode="url"
                hint="Pegá un enlace público o accesible a la imagen."
              />

              <SelectField
                id="occupation"
                label="Ocupación"
                value={application.occupation}
                options={OCCUPATION_OPTIONS}
                onChange={(value) => updateApplication('occupation', value)}
              />

              <TextField
                id="phone"
                label="Teléfono de contacto"
                type="tel"
                value={application.phone}
                onChange={(value) => updateApplication('phone', value)}
                placeholder="Ej. 351 555 1234"
                inputMode="tel"
              />

              <SelectField
                id="maritalStatus"
                label="Estado civil"
                value={application.maritalStatus}
                options={MARITAL_STATUS_OPTIONS}
                onChange={(value) => updateApplication('maritalStatus', value)}
              />

              <div className="space-y-2">
                <TextField
                  id="workAddress"
                  label="Domicilio laboral"
                  value={application.workAddress ?? ''}
                  onChange={(value) => updateApplication('workAddress', value)}
                  placeholder="Calle, número, localidad"
                  disabled={application.workAddressNotApplicable}
                  required={!application.workAddressNotApplicable}
                />

                <label className="flex cursor-pointer items-start gap-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={application.workAddressNotApplicable}
                    onChange={(event) => {
                      const checked = event.target.checked;

                      setApplication((current) => ({
                        ...current,
                        workAddressNotApplicable: checked,
                        workAddress: checked ? null : '',
                      }));
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-input accent-primary"
                  />
                  No aplica (trabajo remoto o sin domicilio laboral)
                </label>
              </div>
            </div>
          </FormSection>

          <FormSection
            icon={<FileCheck2 className="h-5 w-5" />}
            title="Documentación de ingresos"
            description="Cargá una URL para cada uno de tus últimos dos recibos de sueldo."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <TextField
                id="salaryReceipt1"
                label="URL del recibo de sueldo 1"
                type="url"
                value={application.salaryReceiptUrls[0]}
                onChange={(value) => updateSalaryReceipt(0, value)}
                placeholder="https://..."
                inputMode="url"
              />

              <TextField
                id="salaryReceipt2"
                label="URL del recibo de sueldo 2"
                type="url"
                value={application.salaryReceiptUrls[1]}
                onChange={(value) => updateSalaryReceipt(1, value)}
                placeholder="https://..."
                inputMode="url"
              />
            </div>
          </FormSection>

          <FormSection
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Garantes"
            description="Necesitás informar dos garantes con sus datos de contacto y ocupación."
          >
            <div className="space-y-6">
              {application.guarantors.map((guarantor, index) => {
                const guarantorIndex = index as 0 | 1;

                return (
                  <fieldset
                    key={guarantorIndex}
                    className="rounded-xl border border-border bg-secondary/20 p-4"
                  >
                    <legend className="px-2 text-sm font-semibold">Garante {index + 1}</legend>

                    <div className="grid gap-5 md:grid-cols-2">
                      <TextField
                        id={`guarantor-${index}-fullName`}
                        label="Nombre y apellido"
                        value={guarantor.fullName}
                        onChange={(value) => updateGuarantor(guarantorIndex, 'fullName', value)}
                        placeholder="Nombre completo"
                      />

                      <TextField
                        id={`guarantor-${index}-dni`}
                        label="DNI"
                        value={guarantor.dni}
                        onChange={(value) => updateGuarantor(guarantorIndex, 'dni', value)}
                        placeholder="Ej. 30123456"
                        inputMode="numeric"
                        pattern="[0-9. -]{7,12}"
                      />

                      <TextField
                        id={`guarantor-${index}-phone`}
                        label="Teléfono de contacto"
                        type="tel"
                        value={guarantor.phone}
                        onChange={(value) => updateGuarantor(guarantorIndex, 'phone', value)}
                        placeholder="Ej. 351 555 1234"
                        inputMode="tel"
                      />

                      <SelectField
                        id={`guarantor-${index}-occupation`}
                        label="Ocupación"
                        value={guarantor.occupation}
                        options={OCCUPATION_OPTIONS}
                        onChange={(value) => updateGuarantor(guarantorIndex, 'occupation', value)}
                      />
                    </div>
                  </fieldset>
                );
              })}
            </div>
          </FormSection>

          {errorMessage && (
            <p
              role="alert"
              className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
            >
              {errorMessage}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              to={`/tenant/properties/${property.id}`}
              className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition hover:bg-accent"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? 'Generando contrato...' : 'Confirmar y generar contrato'}
            </button>
          </div>
        </form>

        <aside className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft lg:sticky lg:top-20">
          <div className="aspect-[16/10] overflow-hidden bg-muted">
            <img
              src={property.images?.[0] ?? FALLBACK_IMAGE}
              alt={property.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {property.type}
                </p>
                <h2 className="mt-1 font-semibold">{property.title}</h2>
              </div>

              <StatusPill tone="success">Disponible</StatusPill>
            </div>

            <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {property.address}
            </p>

            <div className="mt-5 border-t border-border pt-5">
              <p className="text-xs text-muted-foreground">Alquiler mensual</p>
              <p className="mt-1 text-2xl font-semibold">{formatPrice(property.price)}</p>
            </div>

            <div className="mt-5 flex gap-2 rounded-xl bg-primary-soft p-3 text-xs text-secondary-foreground">
              <BriefcaseBusiness className="h-4 w-4 shrink-0 text-primary" />
              La propiedad seguirá disponible hasta que confirmes y la operación termine
              correctamente.
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

export default RentalApplicationPage;
