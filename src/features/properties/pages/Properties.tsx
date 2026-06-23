import { Link } from 'react-router-dom';
import { Filter, MapPin, Search } from 'lucide-react';
import PageHeader from '../../dashboard/pages/components/PageHeader';
import StatusPill from '../../dashboard/pages/components/StatusPill';

const Properties = () => {
  const properties = [
    {
      id: '1',
      title: 'Av. Corrientes 1234 · 5°B',
      city: 'CABA, Balvanera',
      price: '$ 320.000',
      status: 'alquilada',
      tone: 'success' as const,
      img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
    },
    {
      id: '2',
      title: 'Belgrano 880 · PB',
      city: 'CABA, Monserrat',
      price: '$ 215.000',
      status: 'alquilada',
      tone: 'success' as const,
      img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
    },
    {
      id: '3',
      title: 'Salta 415 · 2°A',
      city: 'CABA, San Telmo',
      price: '$ 410.000',
      status: 'mantenimiento',
      tone: 'warning' as const,
      img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    },
    {
      id: '4',
      title: 'Rivadavia 2200 · 7°C',
      city: 'CABA, Once',
      price: '$ 285.000',
      status: 'disponible',
      tone: 'primary' as const,
      img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800',
    },
    {
      id: '5',
      title: 'Av. Santa Fe 3100 · 4°D',
      city: 'CABA, Palermo',
      price: '$ 520.000',
      status: 'disponible',
      tone: 'primary' as const,
      img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800',
    },
    {
      id: '6',
      title: 'Honduras 5500 · Loft',
      city: 'CABA, Palermo Soho',
      price: '$ 480.000',
      status: 'alquilada',
      tone: 'success' as const,
      img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
    },
  ];

  return (
    <>
      <PageHeader
        title="Propiedades"
        description="Gestioná tu portfolio y agregá nuevas unidades."
        actions={
          <button
            className="
              rounded-md
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
            Agregar propiedad
          </button>
        }
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            className="
              absolute left-3 top-1/2
              -translate-y-1/2
              text-muted-foreground
            "
            size={16}
          />

          <input
            placeholder="Buscar propiedad, contrato, inquilino..."
            className="
              w-full
              rounded-lg
              border border-border
              bg-background
              py-2 pl-9 pr-3
              text-sm
              outline-none
              focus:ring-2
              focus:ring-primary
            "
          />
        </div>

        <button
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
          "
        >
          <Filter className="h-4 w-4" />
          Filtros
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((p) => (
          <Link
            to={`/properties/${p.id}`}
            key={p.id}
            className="
              group
              overflow-hidden
              rounded-2xl
              border border-border
              bg-card
              shadow-soft
              transition
              hover:-translate-y-0.5
              hover:shadow-card
            "
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
              <img
                src={p.img}
                alt={p.title}
                className="
                  h-full
                  w-full
                  object-cover
                  transition
                  group-hover:scale-105
                "
                loading="lazy"
              />

              <div className="absolute left-3 top-3">
                <StatusPill tone={p.tone}>{p.status}</StatusPill>
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-semibold tracking-tight">{p.title}</h3>

              <p
                className="
                  mt-1
                  inline-flex
                  items-center
                  gap-1
                  text-xs
                  text-muted-foreground
                "
              >
                <MapPin className="h-3 w-3" />
                {p.city}
              </p>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-lg font-semibold">{p.price}</span>

                <span className="text-xs text-muted-foreground">/ mes</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Properties;
