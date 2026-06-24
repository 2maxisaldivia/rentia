import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { auth } from '../firebase/auth';

export const getRegistrationErrorMessage = (error: unknown) => {
  if (error instanceof FirebaseError && error.code === 'auth/email-already-in-use') {
    return 'Ya existe una cuenta registrada con este email.';
  }

  return 'No pudimos crear la cuenta. Revisá los datos e intentá nuevamente.';
};

export const registerUser = async (email: string, password: string) => {
  const normalizedEmail = email.trim();

  if (!normalizedEmail || !password.trim()) {
    throw new Error('El email y la contraseña son obligatorios.');
  }

  if (password.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres.');
  }

  const result = await createUserWithEmailAndPassword(auth, normalizedEmail, password);

  return result.user;
};

export const loginUser = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const logoutUser = async () => {
  await signOut(auth);
};
