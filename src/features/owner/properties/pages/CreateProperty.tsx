import { useState } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import PageHeader from '../../dashboard/pages/components/PageHeader';

import { useUser } from '../../../../shared/auth/provider/useContextValue';
import { ROUTES } from '../../../../shared/routes';
import { createProperty } from '../../../../services/property.service';

const CreateProperty = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('Departamento');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrls, setImageUrls] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      setErrorMessage('No pudimos identificar tu usuario para publicar la propiedad.');
      return;
    }

    const trimmedTitle = title.trim();
    const trimmedType = type.trim();
    const trimmedLocation = location.trim();
    const trimmedAddress = address.trim();
    const trimmedDescription = description.trim();

    if (
      !trimmedTitle ||
      !trimmedType ||
      !trimmedLocation ||
      !trimmedAddress ||
      !trimmedDescription ||
      !imageUrls.trim()
    ) {
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      setErrorMessage('Ingresá un precio mensual válido mayor a cero.');
      return;
    }

    const images = imageUrls
      .split(/\r?\n|,/)
      .map((url) => url.trim())
      .filter(Boolean);

    if (images.length === 0) {
      setErrorMessage('Ingresá al menos una URL de imagen para la propiedad.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await createProperty({
        title: trimmedTitle,
        type: trimmedType,
        description: trimmedDescription,
        price: numericPrice,
        ownerId: user.id,
        location: trimmedLocation,
        address: trimmedAddress,
        images,
      });

      navigate(ROUTES.OWNER_PROPERTIES);
    } catch (error) {
      console.error('Error creando propiedad:', error);

      setErrorMessage('No pudimos publicar la propiedad. Intentá nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Link
        to={ROUTES.OWNER_PROPERTIES}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a propiedades
      </Link>

      <div className="mt-4">
        <PageHeader
          title="Agregar propiedad"
          description="Completá los datos para publicar una nueva unidad disponible."
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-2xl border border-border bg-card p-6 shadow-soft"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Título de la publicación
            </label>

            <input
              id="title"
              type="text"
              required
              disabled={isSubmitting}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ej. Av. Colón 1250 · 3°A"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium">
              Tipo de propiedad
            </label>

            <select
              id="type"
              required
              disabled={isSubmitting}
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="Departamento">Departamento</option>
              <option value="Casa">Casa</option>
              <option value="Monoambiente">Monoambiente</option>
              <option value="PH">PH</option>
              <option value="Local comercial">Local comercial</option>
              <option value="Oficina">Oficina</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="price" className="text-sm font-medium">
              Alquiler mensual
            </label>

            <input
              id="price"
              type="number"
              required
              min="1"
              disabled={isSubmitting}
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="Ej. 320000"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium">
              Ubicación
            </label>

            <input
              id="location"
              type="text"
              required
              disabled={isSubmitting}
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Ej. Córdoba, Nueva Córdoba"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <label htmlFor="address" className="text-sm font-medium">
            Dirección
          </label>

          <input
            id="address"
            type="text"
            required
            disabled={isSubmitting}
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Ej. Av. Colón 1250, Córdoba"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div className="mt-5 space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Descripción
          </label>

          <textarea
            id="description"
            required
            rows={5}
            disabled={isSubmitting}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describí la propiedad, sus ambientes, condiciones y principales características."
            className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div className="mt-5 space-y-2">
          <label htmlFor="images" className="text-sm font-medium">
            URLs de imágenes
          </label>

          <textarea
            id="images"
            required
            rows={4}
            disabled={isSubmitting}
            value={imageUrls}
            onChange={(event) => setImageUrls(event.target.value)}
            placeholder={`Pegá una URL por línea.\nEj. https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200`}
            className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-60"
          />

          <p className="text-xs text-muted-foreground">
            La primera URL será la imagen principal de la propiedad.
          </p>
        </div>

        {errorMessage && (
          <p role="alert" className="mt-5 text-sm text-destructive">
            {errorMessage}
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            to={ROUTES.OWNER_PROPERTIES}
            className="inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition hover:bg-accent"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="h-4 w-4" />

            {isSubmitting ? 'Publicando propiedad...' : 'Publicar propiedad'}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateProperty;
