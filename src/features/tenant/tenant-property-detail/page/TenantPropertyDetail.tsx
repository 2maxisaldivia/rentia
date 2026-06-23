import { ArrowLeft, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatusPill from '../../../owner/dashboard/pages/components/StatusPill';
import { ROUTES } from '../../../../shared/routes';
import Card from '../components/Card';

const gallery = [
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800',
];

const TenantPropertyDetail = () => {
  //   const { id } = useParams();

  const disponible = true;

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
        <h1 className="text-3xl font-semibold tracking-tight">Av. Corrientes 1234 · 5°B</h1>

        <p className="text-sm text-muted-foreground">Monoambiente · CABA, Balvanera</p>
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
          <img src={gallery[0]} className="h-full max-h-[480px] w-full object-cover" />
        </div>

        {gallery.slice(1).map((src) => (
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
            <p className="text-sm text-muted-foreground">
              Monoambiente luminoso con balcón al frente. Cocina integrada, piso de madera,
              calefacción central. Ideal para una persona.
            </p>
          </Card>
        </div>

        {/* Estado */}
        <div>
          <Card title="Estado">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Disponibilidad</span>

              <StatusPill tone="success">Disponible</StatusPill>
            </div>
          </Card>
        </div>

        {/* Alquiler */}
        <div>
          <Card title="Alquiler mensual">
            <p className="text-2xl font-semibold">$320.000</p>

            <button
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

              {disponible ? 'Solicitar alquiler' : 'No disponible'}
            </button>
          </Card>
        </div>
      </div>
    </>
  );
};

export default TenantPropertyDetail;
