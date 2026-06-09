import { features } from '../utils/constants';

const FeaturesSection = () => {
  return (
    <section id="funcionalidades" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Funcionalidades</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Diseñado para propietarios e inquilinos.
          </h2>
        </div>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <f.icon className="h-5 w-5 text-primary" />
            <h3 className="mt-4 font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
