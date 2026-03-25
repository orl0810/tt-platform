import { useEffect, useState } from "react";
import { subscriptionService } from "../services/subscriptionService";
import type { Subscription } from "../types/subscription";

export function useSubscription(userId: string | undefined) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    subscriptionService
      .getByUserId(userId)
      .then(setSubscription)
      .finally(() => setLoading(false));
  }, [userId]);

  const isPremium =
    subscription?.status === "active" || subscription?.status === "trialing";

  return { subscription, loading, isPremium };
}
