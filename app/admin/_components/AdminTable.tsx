"use client";

import Link from "next/link";
import { createContext, useContext } from "react";
import { DeleteButton } from "./DeleteButton";
import type { QueryKey } from "@tanstack/react-query";

const GridContext = createContext("1fr 100px");

/* ── Table shell ── */

interface TableProps {
  columns: string[];
  gridCols: string;
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyText?: string;
  emptyAction?: { href: string; label: string };
  children?: React.ReactNode;
}

export function AdminTable({
  columns,
  gridCols,
  isLoading,
  isEmpty,
  emptyText = "No entries yet.",
  emptyAction,
  children,
}: TableProps) {
  if (isLoading) {
    return (
      <p className="text-dim font-light" style={{ fontSize: "0.88rem" }}>
        Loading…
      </p>
    );
  }

  if (isEmpty) {
    return (
      <div style={{ border: "1px dashed var(--surface-2)", padding: "64px", textAlign: "center" }}>
        <p className="text-dim font-light" style={{ fontSize: "0.88rem" }}>
          {emptyText}
        </p>
        {emptyAction && (
          <Link
            href={emptyAction.href}
            style={{ color: "var(--gold)", fontSize: "0.82rem", marginTop: "12px", display: "inline-block" }}
          >
            {emptyAction.label}
          </Link>
        )}
      </div>
    );
  }

  return (
    <GridContext.Provider value={gridCols}>
      <div style={{ border: "1px solid var(--surface-2)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: gridCols,
            padding: "10px 20px",
            borderBottom: "1px solid var(--surface-2)",
            background: "var(--surface)",
          }}
        >
          {columns.map((col) => (
            <span
              key={col}
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--dim)",
                fontFamily: "var(--font-body)",
              }}
            >
              {col}
            </span>
          ))}
        </div>
        {children}
      </div>
    </GridContext.Provider>
  );
}

/* ── Row ── */

interface RowProps {
  editHref: string;
  deleteId: string;
  deleteEndpoint: string;
  deleteQueryKey: QueryKey;
  children: React.ReactNode;
}

export function AdminRow({ editHref, deleteId, deleteEndpoint, deleteQueryKey, children }: RowProps) {
  const gridCols = useContext(GridContext);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: gridCols,
        padding: "16px 20px",
        borderBottom: "1px solid var(--surface-2)",
        alignItems: "center",
      }}
    >
      {children}
      <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
        <Link
          href={editHref}
          style={{ fontSize: "0.72rem", color: "var(--gold)", fontFamily: "var(--font-body)", textDecoration: "none" }}
        >
          Edit
        </Link>
        <DeleteButton id={deleteId} endpoint={deleteEndpoint} queryKey={deleteQueryKey} />
      </div>
    </div>
  );
}

/* ── Cell ── */

interface CellProps {
  children: React.ReactNode;
  color?: "muted" | "dim" | "gold" | "text";
  truncate?: boolean;
  size?: "sm" | "xs";
}

export function AdminCell({ children, color = "muted", truncate, size = "sm" }: CellProps) {
  const colorMap = { muted: "var(--muted)", dim: "var(--dim)", gold: "var(--gold)", text: "var(--text)" };
  return (
    <span
      style={{
        fontSize: size === "xs" ? "0.68rem" : "0.72rem",
        color: colorMap[color],
        fontFamily: "var(--font-body)",
        ...(truncate ? { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const } : {}),
      }}
    >
      {children}
    </span>
  );
}
