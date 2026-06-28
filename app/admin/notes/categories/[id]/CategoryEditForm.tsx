"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  initialData: {
    title: string;
    tagline: string;
    description: string;
    themes: string;
  };
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

export default function CategoryEditForm({ id, initialData }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const themes = form.themes
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);

    const res = await fetch(`/api/admin/notes/categories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: form.title, tagline: form.tagline, description: form.description, themes }),
    });

    if (res.ok) {
      router.push("/admin/notes/categories");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "760px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

        <div>
          <label style={labelStyle}>Title *</label>
          <input type="text" value={form.title} onChange={set("title")} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Tagline</label>
          <input
            type="text"
            value={form.tagline}
            onChange={set("tagline")}
            placeholder="Short line shown under the heading on the category page"
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Description</label>
          <textarea
            value={form.description}
            onChange={set("description")}
            rows={6}
            placeholder={"Two paragraphs about this stream.\n\nSeparate paragraphs with a blank line."}
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.8 }}
          />
          <p style={{ fontSize: "0.68rem", color: "var(--dim)", marginTop: "6px", fontFamily: "var(--font-body)" }}>
            Separate paragraphs with a blank line.
          </p>
        </div>

        <div>
          <label style={labelStyle}>Themes</label>
          <textarea
            value={form.themes}
            onChange={set("themes")}
            rows={8}
            placeholder={"One theme per line:\nCareer clarity and the discipline of decision-making\nFounder identity, business architecture, and traction"}
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.8 }}
          />
          <p style={{ fontSize: "0.68rem", color: "var(--dim)", marginTop: "6px", fontFamily: "var(--font-body)" }}>
            One theme per line.
          </p>
        </div>

        {error && (
          <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{error}</p>
        )}

        <div style={{ display: "flex", gap: "16px", paddingTop: "8px" }}>
          <button
            type="submit"
            disabled={saving}
            className="btn-solid"
            style={{ opacity: saving ? 0.6 : 1, cursor: saving ? "not-allowed" : "pointer", fontSize: "0.78rem", padding: "11px 28px" }}
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/notes/categories")}
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
