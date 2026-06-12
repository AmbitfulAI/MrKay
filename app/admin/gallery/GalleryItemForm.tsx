"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/app/admin/_components/ImageUpload";

interface FormData { title: string; caption: string; category: string; alt: string; span: string; order: string; }
interface Props { initialData?: Partial<FormData> & { assetId?: string }; id?: string; }

const input: React.CSSProperties = { width: "100%", background: "var(--surface)", border: "1px solid var(--surface-2)", color: "var(--text)", padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" };
const label: React.CSSProperties = { display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "8px" };

export function GalleryItemForm({ initialData, id }: Props) {
  const router = useRouter();
  const isEdit = !!id;
  const [form, setForm] = useState<FormData>({ title: "", caption: "", category: "", alt: "", span: "normal", order: "", ...initialData });
  const [assetId, setAssetId] = useState(initialData?.assetId ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEdit && !assetId) { setError("Please upload an image."); return; }
    setSaving(true); setError("");
    const res = await fetch(isEdit ? `/api/admin/gallery/${id}` : "/api/admin/gallery", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, assetId }),
    });
    if (res.ok) { router.push("/admin/gallery"); router.refresh(); }
    else { setError("Something went wrong."); setSaving(false); }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "700px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <ImageUpload value={assetId} onChange={setAssetId} label="Image *" />
        <div><label style={label}>Alt Text</label><input value={form.alt} onChange={set("alt")} placeholder="Describe the image for accessibility" style={input} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div><label style={label}>Title *</label><input value={form.title} onChange={set("title")} required placeholder="e.g. Leadership Summit 2025" style={input} /></div>
          <div><label style={label}>Category</label>
            <select value={form.category} onChange={set("category")} style={input}>
              <option value="">Select</option>
              {["Portrait", "Professional", "Speaking", "Community", "Faith & Life"].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div><label style={label}>Caption</label><input value={form.caption} onChange={set("caption")} placeholder="Optional caption shown below the image" style={input} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 160px", gap: "20px" }}>
          <div><label style={label}>Grid Span</label>
            <select value={form.span} onChange={set("span")} style={input}>
              <option value="normal">Normal</option>
              <option value="wide">Wide (2 columns)</option>
              <option value="tall">Tall (2 rows)</option>
            </select>
          </div>
          <div style={{ maxWidth: "160px" }}><label style={label}>Display Order</label><input type="number" value={form.order} onChange={set("order")} placeholder="1" style={input} /></div>
        </div>
        {error && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{error}</p>}
        <div style={{ display: "flex", gap: "16px" }}>
          <button type="submit" disabled={saving} className="btn-solid" style={{ opacity: saving ? 0.6 : 1, fontSize: "0.78rem", padding: "11px 28px" }}>{saving ? "Saving…" : isEdit ? "Save Changes" : "Add Image"}</button>
          <button type="button" onClick={() => router.push("/admin/gallery")} style={{ background: "none", border: "1px solid var(--surface-2)", color: "var(--muted)", padding: "11px 24px", fontFamily: "var(--font-body)", fontSize: "0.78rem", cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
