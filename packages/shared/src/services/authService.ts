import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import type { FirebaseDeps } from "../services/firebaseTypes";

// Factory function to create a service instance
export function createAuthService({ auth, db }: FirebaseDeps) {
  return {
    async signUp(email: string, password: string, displayName: string): Promise<User> {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(user, { displayName });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        displayName,
        favoriteSessionIds: [],
        completedSessionIds: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      return user;
    },

    async signIn(email: string, password: string): Promise<User> {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    },

    async signOut(): Promise<void> {
      await firebaseSignOut(auth);
    },

    onAuthStateChanged(callback: (user: User | null) => void) {
      return onAuthStateChanged(auth, callback);
    },
  };
}