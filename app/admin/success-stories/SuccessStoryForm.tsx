"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminMutation } from "@/lib/queries/useAdminMutation";
import { QUERY_KEYS } from "@/lib/queries/keys";

interface FormData { code: string; title: string; sector: string; client: string; result: string; story: string; order: string; }
interface Props { initialData?: Partial<FormData>; id?: string; }

const input: React.CSSProperties = { width: "100%", background: "var(--surface)", border: "1px solid var(--surface-2)", color: "var(--text)", padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" };
const label: React.CSSProperties = { display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "8px" };

export function SuccessStoryForm({ initialData, id }: Props) {
  const router = useRouter();
  const isEdit = !!id;
  const [form, setForm] = useState<FormData>({ code: "", title: "", sector: "", client: "", result: "", story: "", order: "", ...initialData });
  const mutation = useAdminMutation(QUERY_KEYS.successStories, () => router.push("/admin/success-stories"));

  function set(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate({
      url: isEdit ? `/api/admin/success-stories/${id}` : "/api/admin/success-stories",
      method: isEdit ? "PATCH" : "POST",
      body: form,
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "700px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "20px" }}>
          <div><label style={label}>Code *</label><input value={form.code} onChange={set("code")} required placeholder="01" style={input} /></div>
          <div><label style={label}>Title *</label><input value={form.title} onChange={set("title")} required placeholder="Navigating a hostile takeover bid" style={input} /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div><label style={label}>Sector *</label><input value={form.sector} onChange={set("sector")} required placeholder="e.g. Banking" style={input} /></div>
          <div><label style={label}>Client Description</label><input value={form.client} onChange={set("client")} placeholder="e.g. Regional bank, West Africa" style={input} /></div>
        </div>
        <div><label style={label}>Key Result</label><input value={form.result} onChange={set("result")} placeholder="e.g. Board confidence restored within 90 days" style={input} /></div>
        <div><label style={label}>Full Story *</label><textarea value={form.story} onChange={set("story")} required rows={7} placeholder="Describe what happened, the challenge, and the outcome…" style={{ ...input, resize: "vertical", lineHeight: 1.7 }} /></div>
        <div style={{ maxWidth: "160px" }}><label style={label}>Display Order</label><input type="number" value={form.order} onChange={set("order")} placeholder="1" style={input} /></div>
        {mutation.isError && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{mutation.error.message}</p>}
        <div style={{ display: "flex", gap: "16px" }}>
          <button type="submit" disabled={mutation.isPending} className="btn-solid" style={{ opacity: mutation.isPending ? 0.6 : 1, fontSize: "0.78rem", padding: "11px 28px" }}>{mutation.isPending ? "Saving…" : isEdit ? "Save Changes" : "Add Story"}</button>
          <button type="button" onClick={() => router.push("/admin/success-stories")} style={{ background: "none", border: "1px solid var(--surface-2)", color: "var(--muted)", padding: "11px 24px", fontFamily: "var(--font-body)", fontSize: "0.78rem", cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
