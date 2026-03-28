import { initializeApp, getApps, getApp } from 'firebase/app';
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
