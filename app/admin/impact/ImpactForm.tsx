"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/app/admin/_components/ImageUpload";
import { useAdminMutation } from "@/lib/queries/useAdminMutation";
import { QUERY_KEYS } from "@/lib/queries/keys";

interface FormData { name: string; category: string; role: string; since: string; description: string; url: string; active: boolean; alt: string; order: string; }
interface Props { initialData?: Partial<FormData> & { imageUrl?: string }; id?: string; }

const input: React.CSSProperties = { width: "100%", background: "var(--surface)", border: "1px solid var(--surface-2)", color: "var(--text)", padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "8px" };

export function ImpactForm({ initialData, id }: Props) {
  const router = useRouter();
  const isEdit = !!id;
  const [form, setForm] = useState<FormData>({ name: "", category: "", role: "", since: "", description: "", url: "", active: true, alt: "", order: "", ...initialData });
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? "");
  const mutation = useAdminMutation(QUERY_KEYS.impact, () => router.push("/admin/impact"));

  function set(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: field === "active" ? (e.target as HTMLInputElement).checked : e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate({
      url: isEdit ? `/api/admin/impact/${id}` : "/api/admin/impact",
      method: isEdit ? "PATCH" : "POST",
      body: { ...form, imageUrl },
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "720px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div><label style={labelStyle}>Organisation Name *</label><input value={form.name} onChange={set("name")} required placeholder="Name" style={input} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div><label style={labelStyle}>Category</label><input value={form.category} onChange={set("category")} placeholder="e.g. Advisory" style={input} /></div>
          <div><label style={labelStyle}>Role</label><input value={form.role} onChange={set("role")} placeholder="e.g. Board Member" style={input} /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div><label style={labelStyle}>Since</label><input value={form.since} onChange={set("since")} placeholder="e.g. 2020" style={input} /></div>
          <div><label style={labelStyle}>Website URL</label><input value={form.url} onChange={set("url")} placeholder="https://..." style={input} /></div>
        </div>
        <div><label style={labelStyle}>Description</label><textarea value={form.description} onChange={set("description")} rows={3} placeholder="Brief description…" style={{ ...input, resize: "vertical", lineHeight: 1.7 }} /></div>
        <ImageUpload value={imageUrl} onChange={setImageUrl} label="Proof-of-Work Image" />
        <div><label style={labelStyle}>Image Alt Text</label><input value={form.alt} onChange={set("alt")} placeholder="Describe the image" style={input} /></div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <input type="checkbox" id="active" checked={form.active} onChange={set("active")} />
          <label htmlFor="active" style={{ ...labelStyle, marginBottom: 0 }}>Active (shown on site)</label>
        </div>
        <div style={{ maxWidth: "140px" }}><label style={labelStyle}>Order</label><input type="number" value={form.order} onChange={set("order")} placeholder="1" style={input} /></div>
        {mutation.isError && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{mutation.error.message}</p>}
        <div style={{ display: "flex", gap: "16px" }}>
          <button type="submit" disabled={mutation.isPending} className="btn-solid" style={{ opacity: mutation.isPending ? 0.6 : 1, fontSize: "0.78rem", padding: "11px 28px" }}>{mutation.isPending ? "Saving…" : isEdit ? "Save Changes" : "Add Organisation"}</button>
          <button type="button" onClick={() => router.push("/admin/impact")} style={{ background: "none", border: "1px solid var(--surface-2)", color: "var(--muted)", padding: "11px 24px", fontFamily: "var(--font-body)", fontSize: "0.78rem", cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
