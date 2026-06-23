import { Link } from 'react-router-dom';
import { Filter, MapPin, Search } from 'lucide-react';
import PageHeader from '../../dashboard/pages/components/PageHeader';
import StatusPill from '../../dashboard/pages/components/StatusPill';
import { properties } from '../utils/constants';

const Properties = () => {
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
