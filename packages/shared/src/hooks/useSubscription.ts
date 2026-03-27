import { useEffect, useState, useMemo } from "react";
import { createSubscriptionService } from "../services/subscriptionService";
import type { Subscription } from "../types/subscription";
import {useFirebase} from "../context/FirebaseProvider";

export function useSubscription(userId: string | undefined) {
  const firebase = useFirebase();
  const subscriptionService = useMemo(() => createSubscriptionService(firebase), [firebase]);

  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setSubscription(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    subscriptionService.getByUserId(userId).then((sub) => {
      if (!cancelled) {
        setSubscription(sub);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [userId, subscriptionService]);

  const isPremium =
      subscription?.status === "active" || subscription?.status === "trialing";

  return { subscription, loading, isPremium };
}
