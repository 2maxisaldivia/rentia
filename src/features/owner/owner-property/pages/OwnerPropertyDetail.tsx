import { ArrowLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../../dashboard/pages/components/PageHeader';
import StatusPill from '../../dashboard/pages/components/StatusPill';
import Card from '../components/Card';

const gallery = [
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800',
];

const OwnerPropertyDetail = () => {
  return (
    <>
      <Link
        to="/properties"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Volver a propiedades
      </Link>
      <PageHeader
        title="Av. Corrientes 1234 · 5°B"
        description="Monoambiente · 42 m² · CABA, Balvanera"
        actions={
          <>
            <button
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
              <FileText className="h-4 w-4" />
              Ver contrato
            </button>
          </>
        }
      />
      <div className="grid gap-4 lg:grid-cols-4">
        <div className="overflow-hidden rounded-2xl border border-border lg:col-span-2 lg:row-span-2">
          <img src={gallery[0]} alt="" className="h-full max-h-[480px] w-full object-cover" />
        </div>
        {gallery.slice(1).map((src) => (
          <div key={src} className="overflow-hidden rounded-2xl border border-border">
            <img src={src} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-6">
        {/* Descripción */}
        <Card title="Descripción">
          <p className="text-sm text-muted-foreground">
            Monoambiente luminoso con balcón al frente. Ideal una persona. Cocina integrada, piso de
            madera, calefacción central. A metros del subte línea B.
          </p>
        </Card>

        {/* Estado + Inquilino */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Estado">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Situación</span>

              <StatusPill tone="success">Alquilada</StatusPill>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pagos</span>

              <StatusPill tone="success">Al día</StatusPill>
            </div>
          </Card>

          <Card title="Inquilino">
            <div className="flex items-center gap-3">
              <div
                className="
            grid
            h-10
            w-10
            place-items-center
            rounded-full
            bg-primary
            text-sm
            font-semibold
            text-primary-foreground
          "
              >
                JP
              </div>

              <div>
                <p className="text-sm font-semibold">Juan Pérez</p>

                <p className="text-xs text-muted-foreground">Desde hace 3 meses</p>
              </div>
            </div>
          </Card>
        </div>
      </div>{' '}
    </>
  );
};
export default OwnerPropertyDetail;
