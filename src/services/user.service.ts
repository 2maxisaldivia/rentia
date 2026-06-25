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
    phone: user.phone.trim(),
  };

  if (
    !normalizedUser.id ||
    !normalizedUser.firstName ||
    !normalizedUser.lastName ||
    !normalizedUser.email ||
    !normalizedUser.phone ||
    !normalizedUser.role ||
    !normalizedUser.createdAt
  ) {
    throw new Error('Todos los campos del perfil son obligatorios.');
  }

  if (normalizedUser.phone.replace(/\D/g, '').length < 8) {
    throw new Error('Ingresá un teléfono de contacto válido.');
  }

  await setDoc(doc(db, 'users', normalizedUser.id), normalizedUser);
};

export const getUserProfile = async (uid: string) => {
  const snapshot = await getDoc(doc(db, 'users', uid));

  if (!snapshot.exists()) {
    return null;
  }

  const user = snapshot.data() as User;

  return {
    ...user,
    phone: user.phone ?? '',
  };
};
