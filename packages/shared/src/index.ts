// Types
export * from "./types/session";
export * from "./types/user";
export * from "./types/subscription";
export * from "./config/env";

// Services
export { createAuthService } from "./services/authService";
export { createSessionService } from "./services/sessionService";
export { createSubscriptionService } from "./services/subscriptionService";

// Firebase (new)
export { initFirebase } from "./services/firebase";
export { FirebaseProvider, useFirebase } from "./context/FirebaseProvider";
export type { FirebaseDeps } from "./services/firebaseTypes";

// Hooks
export { useAuth } from "./hooks/useAuth";
export { useSessions } from "./hooks/useSessions";
export { useFavorites } from "./hooks/useFavorites";
export { useSubscription } from "./hooks/useSubscription";

// Context
export { AuthProvider } from "./context/AuthContext";

// Utils
export * from "./utils/formatters";
export * from "./utils/validators";

// Constants
export * from "./constants";
