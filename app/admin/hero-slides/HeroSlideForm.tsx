"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/app/admin/_components/ImageUpload";

interface FormData {
  eyebrow: string; line1: string; line2: string; subtitle: string;
  imagePos: string;
  primaryLabel: string; primaryHref: string; primaryCalendly: string;
  secondaryLabel: string; secondaryHref: string; secondaryCalendly: string;
  order: string;
}
interface Props { initialData?: Partial<FormData> & { imageUrl?: string }; id?: string; }

const input: React.CSSProperties = { width: "100%", background: "var(--surface)", border: "1px solid var(--surface-2)", color: "var(--text)", padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "8px" };
const sectionHead: React.CSSProperties = { fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-body)", paddingBottom: "12px", borderBottom: "1px solid var(--surface-2)", marginBottom: "4px" };

export function HeroSlideForm({ initialData, id }: Props) {
  const router = useRouter();
  const isEdit = !!id;
  const [form, setForm] = useState<FormData>({
    eyebrow: "", line1: "", line2: "", subtitle: "",
    imagePos: "center top",
    primaryLabel: "", primaryHref: "", primaryCalendly: "false",
    secondaryLabel: "", secondaryHref: "", secondaryCalendly: "false",
    order: "",
    ...initialData,
  });
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEdit && !imageUrl) { setError("Please upload a background image."); return; }
    setSaving(true); setError("");
    const res = await fetch(isEdit ? `/api/admin/hero-slides/${id}` : "/api/admin/hero-slides", {
      method: isEdit ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, imageUrl }),
    });
    if (res.ok) { router.push("/admin/hero-slides"); router.refresh(); }
    else { setError("Something went wrong."); setSaving(false); }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "720px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

        <p style={sectionHead}>Slide Content</p>
        <div><label style={labelStyle}>Eyebrow Text *</label><input value={form.eyebrow} onChange={set("eyebrow")} required placeholder="Executive Operating System Architect · Fractional COO · Coach" style={input} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div><label style={labelStyle}>Headline Line 1 *</label><input value={form.line1} onChange={set("line1")} required placeholder="Clarity → Architecture" style={input} /></div>
          <div><label style={labelStyle}>Headline Line 2 (gold italic) *</label><input value={form.line2} onChange={set("line2")} required placeholder="→ Momentum." style={input} /></div>
        </div>
        <div><label style={labelStyle}>Subtitle Paragraph *</label><textarea value={form.subtitle} onChange={set("subtitle")} required rows={4} placeholder="You're at the kind of inflection point…" style={{ ...input, resize: "vertical", lineHeight: 1.7 }} /></div>

        <p style={sectionHead}>Background Image</p>
        <ImageUpload value={imageUrl} onChange={setImageUrl} label={isEdit ? "Background Image (replace to change)" : "Background Image *"} />
        <div style={{ maxWidth: "260px" }}><label style={labelStyle}>Image Position (CSS object-position)</label><input value={form.imagePos} onChange={set("imagePos")} placeholder="center top" style={input} /></div>

        <p style={sectionHead}>Primary CTA</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div><label style={labelStyle}>Label *</label><input value={form.primaryLabel} onChange={set("primaryLabel")} required placeholder="Find Your Path" style={input} /></div>
          <div><label style={labelStyle}>Link (leave blank if Calendly)</label><input value={form.primaryHref} onChange={set("primaryHref")} placeholder="/career-clarity" style={input} /></div>
        </div>
        <div><label style={labelStyle}>Opens Calendly?</label>
          <select value={form.primaryCalendly} onChange={set("primaryCalendly")} style={{ ...input, maxWidth: "180px" }}>
            <option value="false">No — use link above</option>
            <option value="true">Yes — open Calendly</option>
          </select>
        </div>

        <p style={sectionHead}>Secondary CTA</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div><label style={labelStyle}>Label</label><input value={form.secondaryLabel} onChange={set("secondaryLabel")} placeholder="Meet Kayode" style={input} /></div>
          <div><label style={labelStyle}>Link (leave blank if Calendly)</label><input value={form.secondaryHref} onChange={set("secondaryHref")} placeholder="/my-story" style={input} /></div>
        </div>
        <div><label style={labelStyle}>Opens Calendly?</label>
          <select value={form.secondaryCalendly} onChange={set("secondaryCalendly")} style={{ ...input, maxWidth: "180px" }}>
            <option value="false">No — use link above</option>
            <option value="true">Yes — open Calendly</option>
          </select>
        </div>

        <div style={{ maxWidth: "160px" }}><label style={labelStyle}>Display Order *</label><input type="number" value={form.order} onChange={set("order")} required placeholder="1" style={input} /></div>

        {error && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{error}</p>}
        <div style={{ display: "flex", gap: "16px" }}>
          <button type="submit" disabled={saving} className="btn-solid" style={{ opacity: saving ? 0.6 : 1, fontSize: "0.78rem", padding: "11px 28px" }}>{saving ? "Saving…" : isEdit ? "Save Changes" : "Add Slide"}</button>
          <button type="button" onClick={() => router.push("/admin/hero-slides")} style={{ background: "none", border: "1px solid var(--surface-2)", color: "var(--muted)", padding: "11px 24px", fontFamily: "var(--font-body)", fontSize: "0.78rem", cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
