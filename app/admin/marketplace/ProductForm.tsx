"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData { title: string; subtitle: string; type: string; description: string; price: string; priceNote: string; tag: string; selarUrl: string; available: boolean; coverAccent: string; order: string; }
interface Props { initialData?: Partial<FormData>; id?: string; }

const input: React.CSSProperties = { width: "100%", background: "var(--surface)", border: "1px solid var(--surface-2)", color: "var(--text)", padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" };
const label: React.CSSProperties = { display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "8px" };

export function ProductForm({ initialData, id }: Props) {
  const router = useRouter();
  const isEdit = !!id;
  const [form, setForm] = useState<FormData>({ title: "", subtitle: "", type: "", description: "", price: "", priceNote: "", tag: "", selarUrl: "", available: true, coverAccent: "", order: "", ...initialData });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError("");
    const res = await fetch(isEdit ? `/api/admin/marketplace/${id}` : "/api/admin/marketplace", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) { router.push("/admin/marketplace"); router.refresh(); }
    else { setError("Something went wrong."); setSaving(false); }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "700px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 140px", gap: "20px" }}>
          <div><label style={label}>Title *</label><input value={form.title} onChange={set("title")} required placeholder="e.g. Lead From Within" style={input} /></div>
          <div><label style={label}>Type *</label>
            <select value={form.type} onChange={set("type")} required style={input}>
              <option value="">Select</option>
              <option value="Book">Book</option>
              <option value="Course">Course</option>
            </select>
          </div>
        </div>
        <div><label style={label}>Subtitle</label><input value={form.subtitle} onChange={set("subtitle")} placeholder="e.g. A guide to executive leadership" style={input} /></div>
        <div><label style={label}>Description</label><textarea value={form.description} onChange={set("description")} rows={4} placeholder="What this product is about…" style={{ ...input, resize: "vertical", lineHeight: 1.7 }} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
          <div><label style={label}>Price</label><input value={form.price} onChange={set("price")} placeholder="$24.99" style={input} /></div>
          <div><label style={label}>Price Note</label><input value={form.priceNote} onChange={set("priceNote")} placeholder="Digital + Print" style={input} /></div>
          <div><label style={label}>Tag</label><input value={form.tag} onChange={set("tag")} placeholder="Bestseller" style={input} /></div>
        </div>
        <div><label style={label}>Selar URL</label><input type="url" value={form.selarUrl} onChange={set("selarUrl")} placeholder="https://selar.co/…" style={input} /></div>
        <div><label style={label}>Cover Gradient</label><input value={form.coverAccent} onChange={set("coverAccent")} placeholder="linear-gradient(135deg, #1a1a2e, #16213e)" style={input} /></div>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <div style={{ maxWidth: "160px" }}><label style={label}>Display Order</label><input type="number" value={form.order} onChange={set("order")} placeholder="1" style={input} /></div>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.78rem", fontFamily: "var(--font-body)", color: "var(--text)", cursor: "pointer" }}>
            <input type="checkbox" checked={form.available} onChange={(e) => setForm((f) => ({ ...f, available: e.target.checked }))} />
            Available for purchase
          </label>
        </div>
        {error && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{error}</p>}
        <div style={{ display: "flex", gap: "16px" }}>
          <button type="submit" disabled={saving} className="btn-solid" style={{ opacity: saving ? 0.6 : 1, fontSize: "0.78rem", padding: "11px 28px" }}>{saving ? "Saving…" : isEdit ? "Save Changes" : "Add Product"}</button>
          <button type="button" onClick={() => router.push("/admin/marketplace")} style={{ background: "none", border: "1px solid var(--surface-2)", color: "var(--muted)", padding: "11px 24px", fontFamily: "var(--font-body)", fontSize: "0.78rem", cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
