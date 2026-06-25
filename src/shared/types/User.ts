export type UserRole = 'owner' | 'tenant';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: Date;
}
