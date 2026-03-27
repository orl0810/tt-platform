/*
import { useEffect, useState, useCallback, useMemo } from "react";
import { createSessionService } from "../services/sessionService";
import type { Session } from "../types/session";
import {useFirebase} from "../context/FirebaseProvider";

export function useSessions() {
  const firebase = useFirebase();
  const sessionService = useMemo(() => createSessionService(firebase), [firebase]);

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    sessionService
        .getAll()
        .then((data) => {
          if (!cancelled) setSessions(data);
        })
        .catch((err) => {
          if (!cancelled) setError(err.message);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });

    return () => {
      cancelled = true;
    };
  }, [sessionService]);

  const getSessionById = useCallback(
      (id: string) => sessions.find((s) => s.id === id) ?? null,
      [sessions]
  );

  return { sessions, loading, error, getSessionById };
}
*/

// packages/shared/src/hooks/useSessions.ts
import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  collection, query, where, orderBy,
  getDocs, onSnapshot, QueryConstraint,
} from 'firebase/firestore';
import { db } from '../services/firebase';
import type { Session, SessionLevel } from '../types/session';

interface SessionFilters {
  level?: SessionLevel;
  tags?: string[];
  isPremium?: boolean;
  search?: string;
}

interface UseSessionsReturn {
  sessions: Session[];
  isLoading: boolean;
  error: string | null;
  filters: SessionFilters;
  setFilters: (filters: SessionFilters) => void;
  refetch: () => void;
}

// Cache simple en memoria (se invalida al recargar)
const sessionCache = new Map<string, { data: Session[]; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

export function useSessions(): UseSessionsReturn {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SessionFilters>({});
  const [version, setVersion] = useState(0); // Para forzar refetch

  const cacheKey = JSON.stringify(filters);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    // Revisar caché
    const cached = sessionCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      setSessions(cached.data);
      setIsLoading(false);
      return;
    }

    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
    if (filters.level) constraints.push(where('level', '==', filters.level));
    if (filters.isPremium !== undefined) {
      constraints.push(where('isPremium', '==', filters.isPremium));
    }

    const q = query(collection(db, 'sessions'), ...constraints);

    const unsubscribe = onSnapshot(
        q,
        (snap) => {
          const data = snap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
            createdAt: d.data().createdAt?.toDate(),
          })) as Session[];
          sessionCache.set(cacheKey, { data, timestamp: Date.now() });
          setSessions(data);
          setIsLoading(false);
        },
        (err) => {
          setError(err.message);
          setIsLoading(false);
        }
    );

    return unsubscribe;
  }, [cacheKey, version]);

  // Filtro de búsqueda en cliente (evita índice Firestore extra)
  const filteredSessions = useMemo(() => {
    if (!filters.search) return sessions;
    const q = filters.search.toLowerCase();
    return sessions.filter(
        (s) =>
            s.title.toLowerCase().includes(q) ||
            s.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [sessions, filters.search]);

  return {
    sessions: filteredSessions,
    isLoading,
    error,
    filters,
    setFilters: useCallback((f) => setFilters((prev) => ({ ...prev, ...f })), []),
    refetch: useCallback(() => setVersion((v) => v + 1), []),
  };
}
