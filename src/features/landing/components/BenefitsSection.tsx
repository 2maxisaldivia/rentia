import { benefits } from '../utils/constants';
const BenefitsSection = () => {
  return (
    <section id="beneficios" className="border-t border-border/60 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary">Beneficios</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Todo el alquiler, en una sola pantalla.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Reducí la informalidad con automatización, centralización y trazabilidad.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <b.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default BenefitsSection;
