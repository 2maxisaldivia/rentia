import { doc, setDoc, getDoc } from 'firebase/firestore';

import { db } from '../firebase/firestore';

import type { User } from '../shared/types/User';

export const createUserProfile = async (user: User) => {
  const normalizedUser: User = {
    ...user,
    id: user.id.trim(),
    firstName: user.firstName.trim(),
    lastName: user.lastName.trim(),
    email: user.email.trim(),
  };

  if (
    !normalizedUser.id ||
    !normalizedUser.firstName ||
    !normalizedUser.lastName ||
    !normalizedUser.email ||
    !normalizedUser.role ||
    !normalizedUser.createdAt
  ) {
    throw new Error('Todos los campos del perfil son obligatorios.');
  }

  await setDoc(doc(db, 'users', normalizedUser.id), normalizedUser);
};

export const getUserProfile = async (uid: string) => {
  const snapshot = await getDoc(doc(db, 'users', uid));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as User;
};
