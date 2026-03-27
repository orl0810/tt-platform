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

let process = {};
export const STRIPE_PRICES = {
  MONTHLY: 5,
  ANNUAL: 50,
} as const;
