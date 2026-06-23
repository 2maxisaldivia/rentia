import { doc, setDoc, getDoc } from 'firebase/firestore';

import { db } from '../firebase/firestore';

import type { User } from '../shared/types/User';

export const createUserProfile = async (user: User) => {
  await setDoc(doc(db, 'users', user.id), user);
};

export const getUserProfile = async (uid: string) => {
  const snapshot = await getDoc(doc(db, 'users', uid));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as User;
};
