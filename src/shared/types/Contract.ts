export type ContractStatus = 'active';

export type ContractPerson = {
  fullName: string;
  email: string;
};

export type RentalGuarantor = {
  fullName: string;
  dni: string;
  phone: string;
  occupation: string;
};

export type RentalApplication = {
  dni: string;
  dniImageUrl: string;
  occupation: string;
  workAddress: string | null;
  workAddressNotApplicable: boolean;
  phone: string;
  maritalStatus: string;
  salaryReceiptUrls: [string, string];
  guarantors: [RentalGuarantor, RentalGuarantor];
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
  rentalApplication?: RentalApplication;
};
