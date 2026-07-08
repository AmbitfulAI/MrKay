"use client";

import { useState } from "react";
import { useAdminMutation } from "@/lib/queries/useAdminMutation";
import { QUERY_KEYS } from "@/lib/queries/keys";

export function DeleteNoteButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false);
  const mutation = useAdminMutation(QUERY_KEYS.notes);

  function handleDelete() {
    mutation.mutate({ url: `/api/admin/notes/${id}`, method: "DELETE" });
    setConfirming(false);
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
    <button
      onClick={() => setConfirming(true)}
      disabled={mutation.isPending}
      style={{ fontSize: "0.72rem", color: "var(--dim)", background: "none", border: "none", cursor: mutation.isPending ? "not-allowed" : "pointer", fontFamily: "var(--font-body)", padding: 0, opacity: mutation.isPending ? 0.5 : 1 }}
    >
      {mutation.isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
