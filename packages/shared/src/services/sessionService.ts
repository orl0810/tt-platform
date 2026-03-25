import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Session } from "../types/session";

const toSession = (data: any, id: string): Session => ({
  ...data,
  id,
  createdAt: data.createdAt?.toDate?.() ?? new Date(),
  updatedAt: data.updatedAt?.toDate?.() ?? new Date(),
});

export const sessionService = {
  async getAll(isPremium?: boolean): Promise<Session[]> {
    const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];
    if (isPremium !== undefined) {
      constraints.unshift(where("isPremium", "==", isPremium));
    }
    const q = query(collection(db, "sessions"), ...constraints);
    const snap = await getDocs(q);
    return snap.docs.map((d) => toSession(d.data(), d.id));
  },

  async getById(id: string): Promise<Session | null> {
    const snap = await getDoc(doc(db, "sessions", id));
    if (!snap.exists()) return null;
    return toSession(snap.data(), snap.id);
  },
};
