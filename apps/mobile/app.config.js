// apps/mobile/app.config.js
const IS_DEV = process.env.APP_ENV !== 'production';

// Your Mac's LAN IP — Expo Go on iPhone cannot reach "localhost"
// Run: ipconfig getifaddr en0  (on Mac)
const LOCAL_IP = process.env.LOCAL_IP ?? '192.168.4.35'; // ← CHANGE THIS

export default ({ config }) => ({
  ...config,
  name: IS_DEV ? 'MyApp (Dev)' : 'MyApp',
  slug: 'my-app',
  version: '1.0.0',
  extra: {
    APP_ENV: process.env.APP_ENV ?? 'development',
    // Firebase project config (non-secret, safe in source)
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY ?? 'demo-api-key',
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN ?? `${LOCAL_IP}:9099`,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ?? 'demo-project',
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET ?? 'demo-project.appspot.com',
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID ?? '000000000000',
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID ?? '1:000000000000:web:000000000000',
    // Emulator hosts — must be LAN IP for physical iPhone
    FIREBASE_EMULATOR_HOST: IS_DEV ? LOCAL_IP : null,
    FIREBASE_AUTH_EMULATOR_PORT: '9099',
    FIREBASE_FIRESTORE_EMULATOR_PORT: '8080',
    FIREBASE_STORAGE_EMULATOR_PORT: '9199',
  },
  plugins: ["expo-web-browser", 'expo-router'],
});
