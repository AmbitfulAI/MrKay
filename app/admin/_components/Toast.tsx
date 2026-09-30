"use client";

interface Props {
  message: string;
  visible: boolean;
}

export function Toast({ message, visible }: Props) {
  return (
    <div
      role="status"
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        padding: "14px 22px",
        background: "var(--surface)",
        border: "1px solid var(--gold)",
        color: "var(--gold)",
        fontFamily: "var(--font-body)",
        fontSize: "0.82rem",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 200ms ease, transform 200ms ease",
        pointerEvents: "none",
        zIndex: 500,
      }}
    >
      {message}
    </div>
  );
}
