import { useEffect, useState } from "react";
import { doc, onSnapshot, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useSessions } from "./useSessions";
import type { Session } from "../types/session";
import type { Firestore } from "firebase/firestore";

export function useFavorites(userId: string | undefined, db: Firestore) {
    const { sessions } = useSessions();
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            setLoading(false);
            return;
        }
        const unsubscribe = onSnapshot(doc(db, "users", userId), (snap) => {
            setFavoriteIds(snap.data()?.favoriteSessionIds ?? []);
            setLoading(false);
        });
        return unsubscribe;
    }, [db, userId]);

    const favorites: Session[] = sessions.filter((s) => favoriteIds.includes(s.id));

    const addFavorite = async (sessionId: string) => {
        if (!userId) return;
        await updateDoc(doc(db, "users", userId), {
            favoriteSessionIds: arrayUnion(sessionId),
        });
    };

    const removeFavorite = async (sessionId: string) => {
        if (!userId) return;
        await updateDoc(doc(db, "users", userId), {
            favoriteSessionIds: arrayRemove(sessionId),
        });
    };

    const isFavorite = (sessionId: string) => favoriteIds.includes(sessionId);

    return { favorites, loading, addFavorite, removeFavorite, isFavorite };
}
