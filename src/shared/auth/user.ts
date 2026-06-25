export type UserRole = 'owner' | 'tenant';

export interface AppUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: Date;
}
