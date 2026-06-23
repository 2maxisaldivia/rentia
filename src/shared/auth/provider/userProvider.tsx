import { type ReactNode, useEffect, useState } from 'react';

import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';

import { UserContext } from './useContextValue';

import type { AppUser } from '../user';
import { getUserProfile } from '../../../services/user.service';
import { auth } from '../../../firebase/auth';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (!firebaseUser) {
        setUser(null);

        setLoading(false);

        return;
      }

      const profile = await getUserProfile(firebaseUser.uid);

      setUser(profile);

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return null;
  }

  return (
    <UserContext.Provider
      value={{
        user: user!,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
