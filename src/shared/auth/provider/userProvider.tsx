import { type ReactNode } from 'react';
import { UserContext } from './useContextValue';
import { mockUser } from '../mockUser';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  return <UserContext.Provider value={{ user: mockUser }}>{children}</UserContext.Provider>;
};
