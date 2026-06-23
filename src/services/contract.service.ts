import {
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
  where,
  limit,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';

import { db } from '../firebase/firestore';
import type { Contract } from '../shared/types/Contract';

type ContractUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type PropertyDocument = {
  title?: string;
  type?: string;
  address?: string;
  location?: string;
  price?: number;
  status?: 'available' | 'rented';
  ownerId?: string;
  tenantId?: string | null;
};

type CreateRentalContractInput = {
  propertyId: string;
  tenant: ContractUser;
};

const getFullName = (user: ContractUser) => `${user.firstName} ${user.lastName}`.trim();

const getLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const getContractEndDate = (startDate: Date) => {
  const endDate = new Date(startDate);

  // Contrato ficticio de 12 meses.
  endDate.setFullYear(endDate.getFullYear() + 1);

  return getLocalDate(endDate);
};

const mapContract = (contractDocument: QueryDocumentSnapshot): Contract => {
  return {
    id: contractDocument.id,
    ...(contractDocument.data() as Omit<Contract, 'id'>),
  };
};

const sortByLatestContract = (contracts: Contract[]) => {
  return contracts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
};

export const getTenantContracts = async (tenantId: string): Promise<Contract[]> => {
  const contractsQuery = query(collection(db, 'contracts'), where('tenantId', '==', tenantId));

  const snapshot = await getDocs(contractsQuery);

  return sortByLatestContract(snapshot.docs.map(mapContract));
};

export const getOwnerContracts = async (ownerId: string): Promise<Contract[]> => {
  const contractsQuery = query(collection(db, 'contracts'), where('ownerId', '==', ownerId));

  const snapshot = await getDocs(contractsQuery);

  return sortByLatestContract(snapshot.docs.map(mapContract));
};

export const getContractByPropertyId = async (propertyId: string): Promise<Contract | null> => {
  const contractsQuery = query(
    collection(db, 'contracts'),
    where('propertyId', '==', propertyId),
    limit(1),
  );

  const snapshot = await getDocs(contractsQuery);

  if (snapshot.empty) {
    return null;
  }

  return mapContract(snapshot.docs[0]);
};

export const createRentalContract = async ({
  propertyId,
  tenant,
}: CreateRentalContractInput): Promise<Contract> => {
  const propertyRef = doc(db, 'properties', propertyId);
  const contractRef = doc(collection(db, 'contracts'));

  const now = new Date();
  const startDate = getLocalDate(now);
  const endDate = getContractEndDate(now);

  let createdContract: Contract | null = null;

  await runTransaction(db, async (transaction) => {
    const propertySnapshot = await transaction.get(propertyRef);

    if (!propertySnapshot.exists()) {
      throw new Error('La propiedad ya no existe.');
    }

    const property = propertySnapshot.data() as PropertyDocument;

    if (property.status !== 'available') {
      throw new Error('Esta propiedad ya no se encuentra disponible.');
    }

    if (!property.ownerId) {
      throw new Error('La propiedad no tiene un propietario asignado correctamente.');
    }

    if (typeof property.price !== 'number') {
      throw new Error('La propiedad no tiene un precio válido para generar el contrato.');
    }

    if (property.ownerId === tenant.id) {
      throw new Error('No podés solicitar el alquiler de una propiedad propia.');
    }

    const ownerRef = doc(db, 'users', property.ownerId);
    const ownerSnapshot = await transaction.get(ownerRef);

    if (!ownerSnapshot.exists()) {
      throw new Error('No encontramos los datos del propietario de esta propiedad.');
    }

    const owner = ownerSnapshot.data() as ContractUser;

    const contractData: Omit<Contract, 'id'> = {
      propertyId,
      ownerId: property.ownerId,
      tenantId: tenant.id,

      monthlyAmount: property.price,
      status: 'active',

      createdAt: startDate,
      startDate,
      endDate,

      property: {
        title: property.title ?? 'Propiedad sin título',
        type: property.type ?? 'Propiedad',
        address: property.address ?? property.location ?? 'Dirección no informada',
        location: property.location ?? 'Ubicación no informada',
      },

      owner: {
        fullName: getFullName(owner),
        email: owner.email,
      },

      tenant: {
        fullName: getFullName(tenant),
        email: tenant.email,
      },
    };

    transaction.set(contractRef, contractData);

    transaction.update(propertyRef, {
      status: 'rented',
      tenantId: tenant.id,
    });

    createdContract = {
      id: contractRef.id,
      ...contractData,
    };
  });

  if (!createdContract) {
    throw new Error('No fue posible crear el contrato.');
  }

  return createdContract;
};
