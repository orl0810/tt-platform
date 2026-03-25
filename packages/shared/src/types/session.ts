export type SessionLevel = "beginner" | "intermediate" | "advanced";
export type SessionCategory = "strength" | "cardio" | "flexibility" | "technique";

export interface Exercise {
  id: string;
  name: string;
  description: string;
  durationSeconds: number;
  videoUrl?: string;
  thumbnailUrl?: string;
  reps?: number;
  sets?: number;
}

export interface Session {
  id: string;
 string;
  description: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  durationMinutes: number;
  level: SessionLevel;
  category: SessionCategory;
  exercises: Exercise[];
  isPremium: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
