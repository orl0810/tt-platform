import React, { useState } from "react";
import type { Session, Exercise } from "@tt-platform/shared";

interface ExercisePlayerProps {
  session: Session;
  onComplete?: () => void;
}

export function ExercisePlayer({ session, onComplete }: ExercisePlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const exercises = session.exercises ?? [];
  const current: Exercise | undefined = exercises[currentIndex];

  if (exercises.length === 0) {
    return <p style={{ color: "#94a3b8" }}>No exercises in this session.</p>;
  }

  const isLast = currentIndex === exercises.length - 1;

  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: 12, padding: 24 }}>
      <p style={{ color: "#94a3b8", fontSize: 14 }}>
        Exercise {currentIndex + 1} / {exercises.length}
      </p>
      <h2>{current?.name}</h2>
      <p style={{ color: "#475569" }}>{current?.description}</p>
      {current?.videoUrl && (
        <video
          src={current.videoUrl}
          controls
          style={{ width: "100%", borderRadius: 8, marginTop: 16 }}
        />
      )}
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <button
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          style={{ flex: 1, padding: "10px 0", borderRadius: 8, cursor: "pointer" }}
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (isLast) onComplete?.();
            else setCurrentIndex((i) => i + 1);
          }}
          style={{
            flex: 1,
            padding: "10px 0",
            borderRadius: 8,
            background: "#6366f1",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {isLast ? "Complete ✓" : "Next"}
        </button>
      </div>
    </div>
  );
}
