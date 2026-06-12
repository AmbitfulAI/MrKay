"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/app/admin/_components/ImageUpload";

interface FormData { name: string; category: string; role: string; since: string; description: string; url: string; active: boolean; alt: string; order: string; }
interface Props { initialData?: Partial<FormData> & { assetId?: string }; id?: string; }

const input: React.CSSProperties = { width: "100%", background: "var(--surface)", border: "1px solid var(--surface-2)", color: "var(--text)", padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" };
const label: React.CSSProperties = { display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "8px" };

export function ImpactForm({ initialData, id }: Props) {
  const router = useRouter();
  const isEdit = !!id;
  const [form, setForm] = useState<FormData>({ name: "", category: "", role: "", since: "", description: "", url: "", active: true, alt: "", order: "", ...initialData });
  const [assetId, setAssetId] = useState(initialData?.assetId ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setSaving(true); setError("");
    const res = await fetch(isEdit ? `/api/admin/impact/${id}` : "/api/admin/impact", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, assetId }),
    });
    if (res.ok) { router.push("/admin/impact"); router.refresh(); }
    else { setError("Something went wrong."); setSaving(false); }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "700px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div><label style={label}>Organisation Name *</label><input value={form.name} onChange={set("name")} required placeholder="e.g. Lagos Business School" style={input} /></div>
          <div><label style={label}>Category *</label><input value={form.category} onChange={set("category")} required placeholder="e.g. Education, NGO, Corporate" style={input} /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div><label style={label}>Role</label><input value={form.role} onChange={set("role")} placeholder="e.g. Board Member" style={input} /></div>
          <div><label style={label}>Since (Year)</label><input value={form.since} onChange={set("since")} placeholder="e.g. 2019" style={input} /></div>
        </div>
        <div><label style={label}>Description</label><textarea value={form.description} onChange={set("description")} rows={4} placeholder="What this organisation does and your involvement…" style={{ ...input, resize: "vertical", lineHeight: 1.7 }} /></div>
        <div><label style={label}>Organisation URL</label><input type="url" value={form.url} onChange={set("url")} placeholder="https://…" style={input} /></div>
        <ImageUpload value={assetId} onChange={setAssetId} label="Proof-of-Work Image" />
        <div><label style={label}>Image Alt Text</label><input value={form.alt} onChange={set("alt")} placeholder="Describe the image" style={input} /></div>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <div style={{ maxWidth: "160px" }}><label style={label}>Display Order</label><input type="number" value={form.order} onChange={set("order")} placeholder="1" style={input} /></div>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.78rem", fontFamily: "var(--font-body)", color: "var(--text)", cursor: "pointer" }}>
            <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} />
            Currently active
          </label>
        </div>
        {error && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{error}</p>}
        <div style={{ display: "flex", gap: "16px" }}>
          <button type="submit" disabled={saving} className="btn-solid" style={{ opacity: saving ? 0.6 : 1, fontSize: "0.78rem", padding: "11px 28px" }}>{saving ? "Saving…" : isEdit ? "Save Changes" : "Add Organisation"}</button>
          <button type="button" onClick={() => router.push("/admin/impact")} style={{ background: "none", border: "1px solid var(--surface-2)", color: "var(--muted)", padding: "11px 24px", fontFamily: "var(--font-body)", fontSize: "0.78rem", cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
