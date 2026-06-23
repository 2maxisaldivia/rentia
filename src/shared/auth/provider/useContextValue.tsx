import { createContext, useContext } from 'react';
import type { AppUser } from '../user';

type UserContextType = {
  user: AppUser;
};

export const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser debe usarse dentro de UserProvider');
  }

  return context;
};
