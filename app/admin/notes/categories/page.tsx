"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useAdminMutation } from "@/lib/queries/useAdminMutation";
import { QUERY_KEYS } from "@/lib/queries/keys";

type CategoryType = "writing" | "visual-diary";

interface Category { _id: string; title: string; type: CategoryType; order?: number; }

const TYPE_LABELS: Record<CategoryType, string> = {
  "writing":      "Writing",
  "visual-diary": "Visual Diary",
};

const TYPE_COLORS: Record<CategoryType, string> = {
  "writing":      "var(--gold)",
  "visual-diary": "var(--muted)",
};

const inputStyle: React.CSSProperties = {
  padding: "10px 14px",
  fontSize: "0.82rem",
  fontFamily: "var(--font-body)",
  background: "var(--surface)",
  border: "1px solid var(--surface-2)",
  color: "var(--text)",
};

export default function CategoriesPage() {
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<CategoryType>("writing");
  const [filter, setFilter] = useState<CategoryType | "all">("all");

  const { data: categories = [], isLoading } = useQuery<Category[]>({
    queryKey: QUERY_KEYS.categories,
    queryFn: () => fetch("/api/admin/notes/categories").then((r) => r.json()).then((d) => d.filter((c: Category) => c._id)),
  });

  const addMutation = useAdminMutation(QUERY_KEYS.categories, () => setNewTitle(""));
  const deleteMutation = useAdminMutation(QUERY_KEYS.categories);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addMutation.mutate({
      url: "/api/admin/notes/categories",
      method: "POST",
      body: { title: newTitle.trim(), type: newType, order: categories.length + 1 },
    });
  }

  function handleDelete(id: string, title: string) {
    if (!confirm(`Delete category "${title}"?`)) return;
    deleteMutation.mutate({ url: `/api/admin/notes/categories/${id}`, method: "DELETE" });
  }

  const visible = filter === "all" ? categories : categories.filter((c) => c.type === filter);

  return (
    <div style={{ padding: "40px 48px", maxWidth: "680px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 className="display text-text" style={{ fontSize: "1.4rem", marginBottom: "4px" }}>
          Categories
        </h1>
        <p style={{ fontSize: "0.78rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>
          Writing categories power /writing/[slug] pages. Visual Diary categories filter the Visual Diary page.
        </p>
      </div>

      <form onSubmit={handleAdd} style={{ display: "flex", gap: "10px", marginBottom: "32px" }}>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New category name…"
          style={{ ...inputStyle, flex: 1 }}
        />
        <select
          value={newType}
          onChange={(e) => setNewType(e.target.value as CategoryType)}
          style={{ ...inputStyle, minWidth: "130px" }}
        >
          <option value="writing">Writing</option>
          <option value="visual-diary">Visual Diary</option>
        </select>
        <button
          type="submit"
          disabled={addMutation.isPending || !newTitle.trim()}
          className="btn-solid"
          style={{ whiteSpace: "nowrap", opacity: addMutation.isPending ? 0.6 : 1 }}
        >
          {addMutation.isPending ? "Adding…" : "Add"}
        </button>
      </form>

      <div style={{ display: "flex", gap: "0", marginBottom: "20px", borderBottom: "1px solid var(--surface-2)" }}>
        {(["all", "writing", "visual-diary"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{
              padding: "8px 16px",
              fontSize: "0.65rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontFamily: "var(--font-body)",
              background: "none",
              border: "none",
              borderBottom: filter === t ? "1px solid var(--gold)" : "1px solid transparent",
              color: filter === t ? "var(--gold)" : "var(--muted)",
              cursor: "pointer",
              marginBottom: "-1px",
            }}
          >
            {t === "all" ? "All" : TYPE_LABELS[t]}
            {" "}
            <span style={{ opacity: 0.6 }}>
              ({t === "all" ? categories.length : categories.filter((c) => c.type === t).length})
            </span>
          </button>
        ))}
      </div>

      {isLoading ? (
        <p style={{ fontSize: "0.8rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>Loading…</p>
      ) : visible.length === 0 ? (
        <p style={{ fontSize: "0.8rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>No categories yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
          {visible.map((cat) => (
            <li
              key={cat._id}
              style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", background: "var(--surface)", border: "1px solid var(--surface-2)" }}
            >
              <span style={{ fontSize: "0.55rem", letterSpacing: "0.14em", textTransform: "uppercase", fontFamily: "var(--font-body)", color: TYPE_COLORS[cat.type ?? "writing"], minWidth: "80px" }}>
                {TYPE_LABELS[cat.type ?? "writing"]}
              </span>
              <span style={{ flex: 1, fontSize: "0.85rem", fontFamily: "var(--font-body)", color: "var(--text)" }}>
                {cat.title}
              </span>
              <Link href={`/admin/notes/categories/${cat._id}`} style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-body)", letterSpacing: "0.04em", textDecoration: "none" }}>
                Edit
              </Link>
              <button
                onClick={() => handleDelete(cat._id, cat.title)}
                disabled={deleteMutation.isPending}
                style={{ fontSize: "0.72rem", color: "var(--dim)", background: "none", border: "none", cursor: deleteMutation.isPending ? "not-allowed" : "pointer", fontFamily: "var(--font-body)", letterSpacing: "0.04em", opacity: deleteMutation.isPending ? 0.5 : 1 }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
