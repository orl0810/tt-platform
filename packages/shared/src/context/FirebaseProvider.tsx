import React, { createContext, useContext, useMemo } from "react";
import type { FirebaseDeps } from "../services/firebaseTypes";

const FirebaseContext = createContext<FirebaseDeps | null>(null);

export function FirebaseProvider({
  value,
  children,
}: {
  value: FirebaseDeps;
  children: React.ReactNode;
}) {
  const memo = useMemo(() => value, [value.app, value.auth, value.db, value.storage]);
  return <FirebaseContext.Provider value={memo}>{children}</FirebaseContext.Provider>;
}

export function useFirebase(): FirebaseDeps {
  const ctx = useContext(FirebaseContext);
  if (!ctx) {
    throw new Error("useFirebase must be used within <FirebaseProvider />");
  }
  return ctx;
}

