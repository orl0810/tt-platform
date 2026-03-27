import { doc, getDoc } from "firebase/firestore";
import type { Subscription } from "../types/subscription";
import type { FirebaseDeps } from "./firebaseTypes";

// Helper to convert Firestore doc to Subscription
const toSubscription = (data: any, id: string): Subscription => ({
  ...data,
  id,
  currentPeriodStart: data.currentPeriodStart?.toDate?.() ?? new Date(),
  currentPeriodEnd: data.currentPeriodEnd?.toDate?.() ?? new Date(),
});

export function createSubscriptionService({ db }: FirebaseDeps) {
  return {
    async getByUserId(userId: string): Promise<Subscription | null> {
      const snap = await getDoc(doc(db, "subscriptions", userId));
      if (!snap.exists()) return null;
      return toSubscription(snap.data(), snap.id);
    },
  };
}
