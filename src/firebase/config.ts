// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCzoXEPtU8Fbkaq0iuD_4L-lTIp71Y1txg',
  authDomain: 'rentia-s21.firebaseapp.com',
  projectId: 'rentia-s21',
  storageBucket: 'rentia-s21.firebasestorage.app',
  messagingSenderId: '628511520113',
  appId: '1:628511520113:web:0ee5f1a40ffede472b32d0',
  measurementId: 'G-NHDW0HDB0N',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
