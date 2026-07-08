"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCategories } from "@/components/CategoriesProvider";
import type { CategoryOption } from "@/components/CategoriesProvider";

interface NoteFormData {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  body: string;
}

interface Props {
  initialData?: Partial<NoteFormData>;
  id?: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--surface)",
  border: "1px solid var(--surface-2)",
  color: "var(--text)",
  padding: "10px 14px",
  fontFamily: "var(--font-body)",
  fontSize: "0.88rem",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.6rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--dim)",
  fontFamily: "var(--font-body)",
  marginBottom: "8px",
};

export function NoteForm({ initialData, id }: Props) {
  const router = useRouter();
  const isEdit = !!id;

  const [form, setForm] = useState<NoteFormData>({
    title: "",
    category: "",
    date: "",
    excerpt: "",
    body: "",
    ...initialData,
  });

  const categories: CategoryOption[] = useCategories();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof NoteFormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const url = isEdit ? `/api/admin/notes/${id}` : "/api/admin/notes";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin/notes");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong. Please try again.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "760px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

        {/* Title */}
        <div>
          <label style={labelStyle}>Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={set("title")}
            required
            placeholder="The Cost of Unclear Leadership"
            style={inputStyle}
          />
        </div>

        {/* Category + Date row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div>
            <label style={labelStyle}>Category *</label>
            {categories.length > 0 ? (
              <select value={form.category} onChange={set("category")} required style={inputStyle}>
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.title}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={form.category}
                onChange={set("category")}
                required
                placeholder="e.g. GeniusMined"
                style={inputStyle}
              />
            )}
          </div>
          <div>
            <label style={labelStyle}>Date *</label>
            <input
              type="text"
              value={form.date}
              onChange={set("date")}
              required
              placeholder="e.g. June 2026"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label style={labelStyle}>Excerpt *</label>
          <textarea
            value={form.excerpt}
            onChange={set("excerpt")}
            required
            rows={3}
            placeholder="A short summary shown in the notes list…"
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
          />
        </div>

        {/* Body */}
        <div>
          <label style={labelStyle}>Body *</label>
          <textarea
            value={form.body}
            onChange={set("body")}
            required
            rows={16}
            placeholder={"Write your note here.\n\nSeparate paragraphs with a blank line."}
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.85 }}
          />
          <p style={{ fontSize: "0.68rem", color: "var(--dim)", marginTop: "6px", fontFamily: "var(--font-body)" }}>
            Separate paragraphs with a blank line.
          </p>
        </div>

        {error && (
          <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{error}</p>
        )}

        {/* Actions */}
        <div style={{ display: "flex", gap: "16px", paddingTop: "8px" }}>
          <button
            type="submit"
            disabled={saving}
            className="btn-solid"
            style={{ opacity: saving ? 0.6 : 1, cursor: saving ? "not-allowed" : "pointer", fontSize: "0.78rem", padding: "11px 28px" }}
          >
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Publish Note"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/notes")}
            style={{
              background: "none",
              border: "1px solid var(--surface-2)",
              color: "var(--muted)",
              padding: "11px 24px",
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
