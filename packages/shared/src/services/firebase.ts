/* import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import type { AppEnv } from '../config/env';
import type { FirebaseDeps } from './firebaseTypes';

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

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, Auth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, Firestore } from 'firebase/firestore';
import { getStorage, connectStorageEmulator, FirebaseStorage } from 'firebase/storage';

export interface AppEnv {
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
  };
  emulators?: {
    host: string | null;
    authPort: number;
    firestorePort: number;
    storagePort: number;
  } | null;
}

let _app: FirebaseApp;
let _auth: Auth;
let _db: Firestore;
let _storage: FirebaseStorage;

export function initFirebase(env: AppEnv): FirebaseApp {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  _app = initializeApp(env.firebase);
  _auth = getAuth(_app);
  _db = getFirestore(_app);
  _storage = getStorage(_app);

  if (env.emulators?.host) {
    const { host, authPort, firestorePort, storagePort } = env.emulators;
    connectAuthEmulator(_auth, `http://${host}:${authPort}`, { disableWarnings: false });
    connectFirestoreEmulator(_db, host, firestorePort);
    connectStorageEmulator(_storage, host, storagePort);
    console.log(`[Firebase] Connected to emulators at ${host}`);
  }

  return _app;
}

export function getFirebaseApp(): FirebaseApp {
  if (!_app) throw new Error('Firebase not initialized. Call initFirebase() first.');
  return _app;
}

// Getters — seguros contra uso antes de initFirebase
export function getDb(): Firestore {
  if (!_db) throw new Error('Firebase not initialized. Call initFirebase() first.');
  return _db;
}

export function getFirebaseAuth(): Auth {
  if (!_auth) throw new Error('Firebase not initialized. Call initFirebase() first.');
  return _auth;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (!_storage) throw new Error('Firebase not initialized. Call initFirebase() first.');
  return _storage;
}
