"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CategoryType = "writing" | "visual-diary";

interface Category {
  _id: string;
  title: string;
  type: CategoryType;
  order?: number;
}

const TYPE_LABELS: Record<CategoryType, string> = {
  "writing":      "Writing",
  "visual-diary": "Visual Diary",
};

const TYPE_COLORS: Record<CategoryType, string> = {
  "writing":      "var(--gold)",
  "visual-diary": "var(--muted)",
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState<CategoryType>("writing");
  const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState<CategoryType | "all">("all");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/notes/categories");
    const data = await res.json();
    setCategories(data.filter((c: Category) => c._id));
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setAdding(true);
    await fetch("/api/admin/notes/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle.trim(), type: newType, order: categories.length + 1 }),
    });
    setNewTitle("");
    setAdding(false);
    load();
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete category "${title}"?`)) return;
    await fetch(`/api/admin/notes/categories/${id}`, { method: "DELETE" });
    load();
  }

  const visible = filter === "all" ? categories : categories.filter((c) => c.type === filter);

  const inputStyle: React.CSSProperties = {
    padding: "10px 14px",
    fontSize: "0.82rem",
    fontFamily: "var(--font-body)",
    background: "var(--surface)",
    border: "1px solid var(--surface-2)",
    color: "var(--text)",
  };

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

      {/* Add form */}
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
          disabled={adding || !newTitle.trim()}
          className="btn-solid"
          style={{ whiteSpace: "nowrap", opacity: adding ? 0.6 : 1 }}
        >
          {adding ? "Adding…" : "Add"}
        </button>
      </form>

      {/* Filter tabs */}
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

      {/* List */}
      {loading ? (
        <p style={{ fontSize: "0.8rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>Loading…</p>
      ) : visible.length === 0 ? (
        <p style={{ fontSize: "0.8rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>No categories yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
          {visible.map((cat) => (
            <li
              key={cat._id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                background: "var(--surface)",
                border: "1px solid var(--surface-2)",
              }}
            >
              <span
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-body)",
                  color: TYPE_COLORS[cat.type ?? "writing"],
                  minWidth: "80px",
                }}
              >
                {TYPE_LABELS[cat.type ?? "writing"]}
              </span>
              <span style={{ flex: 1, fontSize: "0.85rem", fontFamily: "var(--font-body)", color: "var(--text)" }}>
                {cat.title}
              </span>
              <Link
                href={`/admin/notes/categories/${cat._id}`}
                style={{ fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-body)", letterSpacing: "0.04em", textDecoration: "none" }}
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(cat._id, cat.title)}
                style={{ fontSize: "0.72rem", color: "var(--dim)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", letterSpacing: "0.04em" }}
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
