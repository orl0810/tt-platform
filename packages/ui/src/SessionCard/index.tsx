import React from "react";
import type { Session } from "@tt-platform/shared";

interface SessionCardProps {
  session: Session;
  onPress?: (session: Session) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (session: Session) => void;
}

export function SessionCard({
  session,
  onPress,
  isFavorite = false,
  onToggleFavorite,
}: SessionCardProps) {
  return (
    <div
      onClick={() => onPress?.(session)}
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: 12,
        padding: 16,
        cursor: onPress ? "pointer" : "default",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        background: "#f8fafc",
      }}
    >
      <div>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{session.title}</h3>
        <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 14 }}>
          {session.description}
        </p>
        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
          <span
            style={{
              background: "#e0e7ff",
              color: "#4338ca",
              borderRadius: 4,
              padding: "2px 8px",
              fontSize: 12,
            }}
          >
            {session.level}
          </span>
          <span style={{ color: "#94a3b8", fontSize: 12 }}>
            {session.durationMinutes}m
          </span>
          {session.isPremium && (
            <span
              style={{
                background: "#fef3c7",
                color: "#d97706",
                borderRadius: 4,
                padding: "2px 8px",
                fontSize: 12,
              }}
            >
              PRO
            </span>
          )}
        </div>
      </div>
      {onToggleFavorite && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(session);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 20,
          }}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      )}
    </div>
  );
}
