import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import type { Subscription } from "../types/subscription";

const toSubscription = (data: any, id: string): Subscription => ({
  ...data,
  id,
  currentPeriodStart: data.currentPeriodStart?.toDate?.() ?? new Date(),
  currentPeriodEnd: data.currentPeriodEnd?.toDate?.() ?? new Date(),
});

export const subscriptionService = {
  async getByUserId(userId: string): Promise<Subscription | null> {
    const snap = await getDoc(doc(db, "subscriptions", userId));
    if (!snap.exists()) return null;
    return toSubscription(snap.data(), snap.id);
  },
};
