export const APP_NAME = "TT Platform";

export const COLLECTIONS = {
  USERS: "users",
  SESSIONS: "sessions",
  SUBSCRIPTIONS: "subscriptions",
} as const;

export const SUBSCRIPTION_PLANS = {
  FREE: "free",
  MONTHLY: "monthly",
  ANNUAL: "annual",
} as const;

export const SESSION_LEVELS = ["beginner", "intermediate", "advanced"] as const;
export const SESSION_CATEGORIES = ["strength", "cardio", "flexibility", "technique"] as const;

export const STRIPE_PRICES = {
  MONTHLY: process.env.VITE_STRIPE_PRICE_MONTHLY ?? process.env.EXPO_PUBLIC_STRIPE_PRICE_MONTHLY ?? "",
  ANNUAL: process.env.VITE_STRIPE_PRICE_ANNUAL ?? process.env.EXPO_PUBLIC_STRIPE_PRICE_ANNUAL ?? "",
} as const;
