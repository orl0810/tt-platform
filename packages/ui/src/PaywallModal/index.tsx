import React from "react";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (plan: "monthly" | "annual") => void;
}

export function PaywallModal({ isOpen, onClose, onSubscribe }: PaywallModalProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 32,
          maxWidth: 400,
          width: "90%",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ margin: "0 0 8px" }}>Unlock Premium 🔐</h2>
        <p style={{ color: "#64748b", marginBottom: 24 }}>
          Get unlimited access to all sessions and exclusive content.
        </p>
        <button
          onClick={() => onSubscribe("monthly")}
          style={{
            width: "100%",
            padding: 14,
            background: "#6366f1",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: 12,
          }}
        >
          Monthly – $9.99/mo
        </button>
        <button
          onClick={() => onSubscribe("annual")}
          style={{
            width: "100%",
            padding: 14,
            background: "#0f172a",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            cursor: "pointer",
            marginBottom: 16,
          }}
        >
          Annual – $79.99/yr <span style={{ fontSize: 12, opacity: 0.7 }}>Save 33%</span>
        </button>
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: 14,
            background: "transparent",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
