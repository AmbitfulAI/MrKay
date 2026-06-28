"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
  _id: string;
  title: string;
  order?: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [adding, setAdding] = useState(false);

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
      body: JSON.stringify({ title: newTitle.trim(), order: categories.length + 1 }),
    });
    setNewTitle("");
    setAdding(false);
    load();
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete category "${title}"? Notes using this category will keep the label but it won't appear in the filter list.`)) return;
    await fetch(`/api/admin/notes/categories/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div style={{ padding: "40px 48px", maxWidth: "600px" }}>
      <div style={{ marginBottom: "32px" }}>
        <h1 className="display text-text" style={{ fontSize: "1.4rem", marginBottom: "4px" }}>
          Note Categories
        </h1>
        <p style={{ fontSize: "0.78rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>
          Each category becomes a page at /writing/[slug]. Edit to add a tagline, description, and themes.
        </p>
      </div>

      {/* Add form */}
      <form onSubmit={handleAdd} style={{ display: "flex", gap: "10px", marginBottom: "32px" }}>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New category name…"
          style={{
            flex: 1,
            padding: "10px 14px",
            fontSize: "0.82rem",
            fontFamily: "var(--font-body)",
            background: "var(--surface)",
            border: "1px solid var(--surface-2)",
            color: "var(--text)",
          }}
        />
        <button
          type="submit"
          disabled={adding || !newTitle.trim()}
          className="btn-solid"
          style={{ whiteSpace: "nowrap", opacity: adding ? 0.6 : 1 }}
        >
          {adding ? "Adding…" : "Add"}
        </button>
      </form>

      {/* List */}
      {loading ? (
        <p style={{ fontSize: "0.8rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>Loading…</p>
      ) : categories.length === 0 ? (
        <p style={{ fontSize: "0.8rem", color: "var(--muted)", fontFamily: "var(--font-body)" }}>No categories yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
          {categories.map((cat) => (
            <li
              key={cat._id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 16px",
                background: "var(--surface)",
                border: "1px solid var(--surface-2)",
              }}
            >
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
