export type UserRole = 'owner' | 'tenant';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
