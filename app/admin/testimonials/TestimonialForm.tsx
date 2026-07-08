"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminMutation } from "@/lib/queries/useAdminMutation";
import { QUERY_KEYS } from "@/lib/queries/keys";

const PAGE_OPTIONS = [
  { value: "home",                   label: "Homepage" },
  { value: "career-clarity",         label: "Career Clarity" },
  { value: "organisational-systems", label: "Organisational Systems" },
  { value: "my-story",               label: "My Story" },
  { value: "founder-architecture",   label: "Founder Architecture" },
  { value: "workshops-speaking",     label: "Workshops & Speaking" },
  { value: "testimonials",           label: "Testimonials Page" },
];

interface FormData { quote: string; clientName: string; clientContext: string; order: string; }
interface Props { initialData?: Partial<FormData> & { pages?: string[] }; id?: string; }

const input: React.CSSProperties = { width: "100%", background: "var(--surface)", border: "1px solid var(--surface-2)", color: "var(--text)", padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "8px" };

export function TestimonialForm({ initialData, id }: Props) {
  const router = useRouter();
  const isEdit = !!id;
  const [form, setForm] = useState<FormData>({ quote: "", clientName: "", clientContext: "", order: "", ...initialData });
  const [pages, setPages] = useState<string[]>(initialData?.pages ?? []);
  const mutation = useAdminMutation(QUERY_KEYS.testimonials, () => router.push("/admin/testimonials"));

  function set(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function togglePage(value: string) {
    setPages((prev) => prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate({
      url: isEdit ? `/api/admin/testimonials/${id}` : "/api/admin/testimonials",
      method: isEdit ? "PATCH" : "POST",
      body: { ...form, pages },
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "700px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div><label style={labelStyle}>Quote *</label><textarea value={form.quote} onChange={set("quote")} required rows={5} placeholder="The most honest and incisive…" style={{ ...input, resize: "vertical", lineHeight: 1.7 }} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div><label style={labelStyle}>Client Name</label><input value={form.clientName} onChange={set("clientName")} placeholder="e.g. Chukwuemeka Obi" style={input} /></div>
          <div><label style={labelStyle}>Client Context</label><input value={form.clientContext} onChange={set("clientContext")} placeholder="e.g. CEO, Financial Services" style={input} /></div>
        </div>
        <div>
          <p style={labelStyle}>Show on Pages</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {PAGE_OPTIONS.map((opt) => (
              <label key={opt.value} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: "0.78rem", color: pages.includes(opt.value) ? "var(--gold)" : "var(--muted)" }}>
                <input type="checkbox" checked={pages.includes(opt.value)} onChange={() => togglePage(opt.value)} style={{ accentColor: "var(--gold)" }} />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: "160px" }}><label style={labelStyle}>Display Order</label><input type="number" value={form.order} onChange={set("order")} placeholder="1" style={input} /></div>
        {mutation.isError && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{mutation.error.message}</p>}
        <div style={{ display: "flex", gap: "16px" }}>
          <button type="submit" disabled={mutation.isPending} className="btn-solid" style={{ opacity: mutation.isPending ? 0.6 : 1, fontSize: "0.78rem", padding: "11px 28px" }}>{mutation.isPending ? "Saving…" : isEdit ? "Save Changes" : "Add Testimonial"}</button>
          <button type="button" onClick={() => router.push("/admin/testimonials")} style={{ background: "none", border: "1px solid var(--surface-2)", color: "var(--muted)", padding: "11px 24px", fontFamily: "var(--font-body)", fontSize: "0.78rem", cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
