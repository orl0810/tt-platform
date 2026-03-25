import { useEffect, useState, useCallback } from "react";
import { sessionService } from "../services/sessionService";
import type { Session } from "../types/session";

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    sessionService
      .getAll()
      .then(setSessions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const getSessionById = useCallback(
    (id: string) => sessions.find((s) => s.id === id) ?? null,
    [sessions]
  );

  return { sessions, loading, error, getSessionById };
}
