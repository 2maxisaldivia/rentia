import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg from '../../../assets/hero.png';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--primary-soft),_transparent_60%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24 lg:px-8">
        <div className="animate-[slide-up_0.6s_ease-out]">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> PropTech para dueños directos
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Alquilá sin intermediarios,
            <span className="block text-primary">con trazabilidad total.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Centralizá contratos, pagos, reclamos y comunicación con tus inquilinos. La plataforma
            que reemplaza al cuaderno, al WhatsApp y al Excel.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="
      inline-flex items-center gap-2
      rounded-lg
      bg-primary
      px-6
      py-3
      font-medium
      text-primary-foreground
      hover:opacity-90
      transition-opacity
    "
            >
              Publicar propiedad
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/login"
              className="
      inline-flex items-center
      rounded-lg
      border
      border-border
      bg-background
      px-6
      py-3
      font-medium
      hover:bg-accent
      transition-colors
    "
            >
              Ingresar
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {['Sin comisiones', 'Pruebas gratis 30 días', 'Soporte en español'].map((t) => (
              <li key={t} className="inline-flex items-center gap-2">
                <Check className="h-4 w-4 text-success" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-primary/10 to-transparent blur-2xl" />
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-card">
            <img
              src={heroImg}
              alt="Plataforma de gestión de alquileres"
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden w-56 rounded-2xl border border-border bg-card p-4 shadow-card sm:block">
            <p className="text-xs text-muted-foreground">Próximo vencimiento</p>
            <p className="mt-1 text-sm font-semibold">Av. Corrientes 1234 · 5°B</p>
            <p className="mt-2 text-xs">
              <span className="font-medium text-success">$ 320.000</span> · vence en 3 días
            </p>
          </div>
          <div className="absolute -right-4 -top-4 hidden w-48 rounded-2xl border border-border bg-card p-4 shadow-card sm:block">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-success" />
              <p className="text-xs font-medium">Pago confirmado</p>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Comprobante validado automáticamente
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
