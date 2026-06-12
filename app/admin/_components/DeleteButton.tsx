"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteButton({ id, endpoint }: { id: string; endpoint: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    router.refresh();
  }

  if (confirming) {
    return (
      <span style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <button onClick={handleDelete} style={{ fontSize: "0.72rem", color: "#e05555", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", padding: 0 }}>
          Confirm
        </button>
        <button onClick={() => setConfirming(false)} style={{ fontSize: "0.72rem", color: "var(--dim)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", padding: 0 }}>
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button onClick={() => setConfirming(true)} style={{ fontSize: "0.72rem", color: "var(--dim)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", padding: 0 }}>
      Delete
    </button>
  );
}
