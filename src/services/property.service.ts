import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firestore';

export type PropertyStatus = 'available' | 'rented';

export type Property = {
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
  images?: string[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapProperty = (doc: any): Property => {
  const data = doc.data();

  return {
    id: doc.id,
    title: data.title,
    type: data.type,
    description: data.description,
    price: data.price,
    status: data.status,
    ownerId: data.ownerId,
    tenantId: data.tenantId ?? null,
    location: data.location,
    address: data.address,
    images: data.images ?? [],
  };
};

export const getOwnerProperties = async (ownerId: string) => {
  const q = query(collection(db, 'properties'), where('ownerId', '==', ownerId));

  const snapshot = await getDocs(q);

  return snapshot.docs.map(mapProperty);
};

export const getAvailableProperties = async () => {
  const q = query(collection(db, 'properties'), where('status', '==', 'available'));

  const snapshot = await getDocs(q);

  return snapshot.docs.map(mapProperty);
};

export const getPropertyById = async (propertyId: string) => {
  const snapshot = await getDoc(doc(db, 'properties', propertyId));

  if (!snapshot.exists()) {
    return null;
  }

  return mapProperty(snapshot);
};
