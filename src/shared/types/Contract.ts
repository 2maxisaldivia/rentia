export interface Contract {
  id: string;
  propertyId: string;
  ownerId: string;
  tenantId: string;
  status: 'active';
  startDate: Date;
  endDate: Date;
  monthlyAmount: number;
}
