"use client";

import { useState } from "react";
import { useAdminMutation } from "@/lib/queries/useAdminMutation";

interface Props {
  id: string;
  endpoint: string;
  queryKey: readonly string[];
}

export function DeleteButton({ id, endpoint, queryKey }: Props) {
  const [confirming, setConfirming] = useState(false);
  const mutation = useAdminMutation(queryKey);

  function handleDelete() {
    mutation.mutate({ url: `${endpoint}/${id}`, method: "DELETE" });
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
