/*
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { User } from "firebase/auth";
import { createAuthService } from "../services/authService";
import {useFirebase} from "./FirebaseProvider";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signIn?: (email: string, password: string) => Promise<User>;
  signUp?: (email: string, password: string, displayName: string) => Promise<User>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const firebase = useFirebase();
    const authService = createAuthService(firebase);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, [authService]);

  const signOut = async () => {
    await authService.signOut();
  };

  return (
      <AuthContext.Provider
          value={{
            user,
            loading,
            signOut,
            signIn: authService.signIn,
            signUp: authService.signUp,
          }}
      >
        {children}
      </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
*/


// packages/shared/src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import type { UserProfile } from '../types/user';

interface AuthContextValue {
    user: User | null;
    profile: UserProfile | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    isPremium: boolean;
    signInWithEmail: (email: string, password: string) => Promise<void>;
    signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Crear o actualizar perfil en Firestore
    const upsertUserProfile = useCallback(async (firebaseUser: User) => {
        const ref = doc(db, 'users', firebaseUser.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
            const newProfile: Omit<UserProfile, 'createdAt' | 'updatedAt'> & {
                createdAt: ReturnType<typeof serverTimestamp>;
                updatedAt: ReturnType<typeof serverTimestamp>;
            } = {
                uid: firebaseUser.uid,
                email: firebaseUser.email ?? '',
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                subscriptionStatus: 'free',
                favoriteSessions: [],
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };
            await setDoc(ref, newProfile);
            setProfile({ ...newProfile, createdAt: new Date(), updatedAt: new Date() });
        } else {
            setProfile(snap.data() as UserProfile);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                await upsertUserProfile(firebaseUser);
            } else {
                setProfile(null);
            }
            setIsLoading(false);
        });
        return unsubscribe;
    }, [upsertUserProfile]);

    const signInWithEmail = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const signUpWithEmail = async (email: string, password: string, displayName: string) => {
        const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);
        await upsertUserProfile({ ...newUser, displayName });
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('email');
        const result = await signInWithPopup(auth, provider);
        await upsertUserProfile(result.user);
    };

    const logout = async () => {
        await signOut(auth);
        setProfile(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                profile,
                isLoading,
                isAuthenticated: !!user,
                isPremium: profile?.subscriptionStatus === 'premium',
                signInWithEmail,
                signUpWithEmail,
                signInWithGoogle,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
}
