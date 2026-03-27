/*
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import type { AppEnv } from "../config/env";
import type { FirebaseDeps } from "./firebaseTypes";

let appInstance: ReturnType<typeof initializeApp>;

export function initFirebase(env: AppEnv): FirebaseDeps {
  if (!getApps().length) {
    appInstance = initializeApp(env.firebase);
  } else {
    appInstance = getApp();
  }

  return {
    app: appInstance,
    auth: getAuth(appInstance),
    db: getFirestore(appInstance),
    storage: getStorage(appInstance),
  };
}
*/


import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

// Evitar inicialización múltiple (crítico en HMR)
const app = getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Conectar a emuladores en desarrollo
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  const host = 'localhost';
  try {
    connectAuthEmulator(auth, `http://${host}:9099`, { disableWarnings: true });
    connectFirestoreEmulator(db, host, 8080);
    connectStorageEmulator(storage, host, 9199);
  } catch (e) {
    // Ya conectado en hot-reload
  }
}
