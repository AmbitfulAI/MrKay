"use client";

import { useState } from "react";

interface Props {
  onDelete: () => void;
  isPending?: boolean;
}

export function DeleteButton({ onDelete, isPending }: Props) {
  const [confirming, setConfirming] = useState(false);

  function handleDelete() {
    onDelete();
    setConfirming(false);
  }

  const btnStyle: React.CSSProperties = {
    fontSize: "0.72rem",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    padding: 0,
  };

  if (confirming) {
    return (
      <span style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <button onClick={handleDelete} style={{ ...btnStyle, color: "#e05555" }}>Confirm</button>
        <button onClick={() => setConfirming(false)} style={{ ...btnStyle, color: "var(--dim)" }}>Cancel</button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      disabled={isPending}
      style={{ ...btnStyle, color: "var(--dim)", cursor: isPending ? "not-allowed" : "pointer", opacity: isPending ? 0.5 : 1 }}
    >
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
