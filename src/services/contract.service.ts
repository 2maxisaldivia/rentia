import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  where,
  limit,
  type QueryDocumentSnapshot,
} from 'firebase/firestore';

import { db } from '../firebase/firestore';
import type { Contract, RentalApplication } from '../shared/types/Contract';

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
  rentalApplication: RentalApplication;
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

const normalizeText = (value: string) => (typeof value === 'string' ? value.trim() : '');

const normalizeDni = (value: string) => normalizeText(value).replace(/[.\s-]/g, '');

const normalizeUrl = (value: string) => {
  const normalizedValue = normalizeText(value);

  try {
    const url = new URL(normalizedValue);

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      throw new Error();
    }

    return url.toString();
  } catch {
    throw new Error('Las fotos y los recibos deben cargarse mediante URLs válidas.');
  }
};

const normalizeRentalApplication = (application: RentalApplication): RentalApplication => {
  if (application.salaryReceiptUrls.length !== 2 || application.guarantors.length !== 2) {
    throw new Error('La solicitud debe incluir dos recibos de sueldo y dos garantes.');
  }

  const dni = normalizeDni(application.dni);
  const occupation = normalizeText(application.occupation);
  const phone = normalizeText(application.phone);
  const maritalStatus = normalizeText(application.maritalStatus);
  const workAddress = application.workAddressNotApplicable
    ? null
    : normalizeText(application.workAddress ?? '');

  if (!/^\d{7,9}$/.test(dni)) {
    throw new Error('Ingresá un DNI válido de entre 7 y 9 dígitos.');
  }

  if (!occupation || !phone || !maritalStatus) {
    throw new Error('Completá todos los datos personales solicitados.');
  }

  if (!application.workAddressNotApplicable && !workAddress) {
    throw new Error('Ingresá el domicilio laboral o marcá la opción “No aplica”.');
  }

  const guarantors = application.guarantors.map((guarantor, index) => {
    const normalizedGuarantor = {
      fullName: normalizeText(guarantor.fullName),
      dni: normalizeDni(guarantor.dni),
      phone: normalizeText(guarantor.phone),
      occupation: normalizeText(guarantor.occupation),
    };

    if (
      !normalizedGuarantor.fullName ||
      !normalizedGuarantor.phone ||
      !normalizedGuarantor.occupation
    ) {
      throw new Error(`Completá todos los datos del garante ${index + 1}.`);
    }

    if (!/^\d{7,9}$/.test(normalizedGuarantor.dni)) {
      throw new Error(`Ingresá un DNI válido para el garante ${index + 1}.`);
    }

    return normalizedGuarantor;
  }) as RentalApplication['guarantors'];

  return {
    dni,
    dniImageUrl: normalizeUrl(application.dniImageUrl),
    occupation,
    workAddress,
    workAddressNotApplicable: application.workAddressNotApplicable,
    phone,
    maritalStatus,
    salaryReceiptUrls: [
      normalizeUrl(application.salaryReceiptUrls[0]),
      normalizeUrl(application.salaryReceiptUrls[1]),
    ],
    guarantors,
  };
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

export const getContractById = async (contractId: string): Promise<Contract | null> => {
  const snapshot = await getDoc(doc(db, 'contracts', contractId));

  if (!snapshot.exists()) {
    return null;
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as Omit<Contract, 'id'>),
  };
};

export const createRentalContract = async ({
  propertyId,
  tenant,
  rentalApplication,
}: CreateRentalContractInput): Promise<Contract> => {
  const normalizedRentalApplication = normalizeRentalApplication(rentalApplication);
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

      rentalApplication: normalizedRentalApplication,
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
