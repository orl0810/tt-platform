export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  favoriteSessionIds: string[];
  completedSessionIds: string[];
  createdAt: Date;
  updatedAt: Date;
}
