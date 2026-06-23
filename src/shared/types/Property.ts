export type PropertyStatus = 'available' | 'rented';

export interface Property {
  id: string;

  title: string;
  type: string;
  description: string;

  price: number;
  status: PropertyStatus;

  ownerId: string;
  tenantId: string | null;

  location: string;
  address: string;

  images: string[];

  features: string[];
  requirements: string[];

  characteristics: {
    ambientes: number;
    dormitorios: number;
    banos: number;
    m2: number;
  };
}
