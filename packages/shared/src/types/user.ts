export interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  subscriptionStatus: 'free' | 'premium' | 'canceled';
  favoriteSessions: string[];
  createdAt: Date;
  updatedAt: Date;
}
