export type PropertyStatus = 'available' | 'rented';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  status: PropertyStatus;
  ownerId: string;
  tenantId?: string | null;
  images: string[];
  city: string;
}
