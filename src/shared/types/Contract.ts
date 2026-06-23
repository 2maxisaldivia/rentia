export type ContractStatus = 'active';

export type ContractPerson = {
  fullName: string;
  email: string;
};

export type ContractProperty = {
  title: string;
  type: string;
  address: string;
  location: string;
};

export type Contract = {
  id: string;

  propertyId: string;
  ownerId: string;
  tenantId: string;

  monthlyAmount: number;
  status: ContractStatus;

  createdAt: string;
  startDate: string;
  endDate: string;

  property: ContractProperty;
  owner: ContractPerson;
  tenant: ContractPerson;
};
