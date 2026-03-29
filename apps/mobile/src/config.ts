// apps/mobile/src/config.ts
import Constants from 'expo-constants';
import type { AppEnv } from '@tt/shared';

// Type-safe accessor for app.config.js `extra` block
const extra = Constants.expoConfig?.extra as Record<string, string | null>;

function requireString(name: string, value: string | null | undefined): string {
  if (value == null || value.trim() === '') {
    throw new Error(`Missing required env var ${name}`);
  }
  return value;
}

const firebaseConfig: AppEnv['firebase'] = {
  apiKey: requireString('FIREBASE_API_KEY', extra.FIREBASE_API_KEY),
  authDomain: requireString('FIREBASE_AUTH_DOMAIN', extra.FIREBASE_AUTH_DOMAIN),
  projectId: requireString('FIREBASE_PROJECT_ID', extra.FIREBASE_PROJECT_ID),
  storageBucket: requireString('FIREBASE_STORAGE_BUCKET', extra.FIREBASE_STORAGE_BUCKET),
  messagingSenderId: requireString('FIREBASE_MESSAGING_SENDER_ID', extra.FIREBASE_MESSAGING_SENDER_ID),
  appId: requireString('FIREBASE_APP_ID', extra.FIREBASE_APP_ID),
};

export const AppConfig = {
  appEnv: extra.APP_ENV ?? 'development',
  isDev: (extra.APP_ENV ?? 'development') !== 'production',

  firebase: firebaseConfig,

  emulators: {
    host: extra.FIREBASE_EMULATOR_HOST, // null in prod
    authPort: Number(extra.FIREBASE_AUTH_EMULATOR_PORT ?? 9099),
    firestorePort: Number(extra.FIREBASE_FIRESTORE_EMULATOR_PORT ?? 8080),
    storagePort: Number(extra.FIREBASE_STORAGE_EMULATOR_PORT ?? 9199),
  },
};
