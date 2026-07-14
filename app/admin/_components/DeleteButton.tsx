"use client";

import { useState } from "react";
import { useAdminMutation } from "@/lib/queries/useAdminMutation";
import type { QueryKey } from "@tanstack/react-query";

interface Props {
  id: string;
  endpoint: string;
  queryKey: QueryKey;
}

export function DeleteButton({ id, endpoint, queryKey }: Props) {
  const [confirming, setConfirming] = useState(false);
  const mutation = useAdminMutation(queryKey);

  function handleDelete() {
    mutation.mutate({ url: `${endpoint}/${id}`, method: "DELETE" });
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
      disabled={mutation.isPending}
      style={{ ...btnStyle, color: "var(--dim)", cursor: mutation.isPending ? "not-allowed" : "pointer", opacity: mutation.isPending ? 0.5 : 1 }}
    >
      {mutation.isPending ? "Deleting…" : "Delete"}
    </button>
  );
}
