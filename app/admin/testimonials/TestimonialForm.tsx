"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData { quote: string; clientName: string; clientContext: string; order: string; }
interface Props { initialData?: Partial<FormData>; id?: string; }

const input: React.CSSProperties = { width: "100%", background: "var(--surface)", border: "1px solid var(--surface-2)", color: "var(--text)", padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" };
const label: React.CSSProperties = { display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "8px" };

export function TestimonialForm({ initialData, id }: Props) {
  const router = useRouter();
  const isEdit = !!id;
  const [form, setForm] = useState<FormData>({ quote: "", clientName: "", clientContext: "", order: "", ...initialData });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError("");
    const res = await fetch(isEdit ? `/api/admin/testimonials/${id}` : "/api/admin/testimonials", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) { router.push("/admin/testimonials"); router.refresh(); }
    else { setError("Something went wrong."); setSaving(false); }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "700px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div><label style={label}>Quote *</label><textarea value={form.quote} onChange={set("quote")} required rows={5} placeholder="The most honest and incisive…" style={{ ...input, resize: "vertical", lineHeight: 1.7 }} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div><label style={label}>Client Name</label><input value={form.clientName} onChange={set("clientName")} placeholder="e.g. Chukwuemeka Obi" style={input} /></div>
          <div><label style={label}>Client Context</label><input value={form.clientContext} onChange={set("clientContext")} placeholder="e.g. CEO, Financial Services" style={input} /></div>
        </div>
        <div style={{ maxWidth: "160px" }}><label style={label}>Display Order</label><input type="number" value={form.order} onChange={set("order")} placeholder="1" style={input} /></div>
        {error && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{error}</p>}
        <div style={{ display: "flex", gap: "16px" }}>
          <button type="submit" disabled={saving} className="btn-solid" style={{ opacity: saving ? 0.6 : 1, fontSize: "0.78rem", padding: "11px 28px" }}>{saving ? "Saving…" : isEdit ? "Save Changes" : "Add Testimonial"}</button>
          <button type="button" onClick={() => router.push("/admin/testimonials")} style={{ background: "none", border: "1px solid var(--surface-2)", color: "var(--muted)", padding: "11px 24px", fontFamily: "var(--font-body)", fontSize: "0.78rem", cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
