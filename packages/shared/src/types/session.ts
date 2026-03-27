export type SessionLevel = 'beginner' | 'intermediate' | 'advanced';
export type SessionCategory = "strength" | "cardio" | "flexibility" | "technique";

export interface Exercise {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    durationSeconds: number;
    order: number;
}

export interface Session {
    id: string;
    title: string;
    description: string;
    level: SessionLevel;
    objective: string;
    durationMinutes: number;
    isPremium: boolean;
    exercises: Exercise[];
    tags: string[];
    thumbnailUrl: string;
    createdAt: Date;
}
