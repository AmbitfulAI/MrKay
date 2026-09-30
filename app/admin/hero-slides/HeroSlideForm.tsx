"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/app/admin/_components/ImageUpload";
import { useAdminMutation } from "@/lib/queries/useAdminMutation";
import { QUERY_KEYS } from "@/lib/queries/keys";

interface FormData {
  eyebrow: string; line1: string; line2: string; subtitle: string;
  imagePos: string;
  primaryLabel: string; primaryHref: string; primaryCalendly: string;
  secondaryLabel: string; secondaryHref: string; secondaryCalendly: string;
}
interface Props { initialData?: Partial<FormData> & { imageUrl?: string }; id?: string; }

const POSITION_PRESETS = [
  { value: "center top",    label: "Top" },
  { value: "center 20%",    label: "Upper" },
  { value: "center center", label: "Center" },
  { value: "center 35%",    label: "Lower" },
  { value: "center bottom", label: "Bottom" },
];

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
    ...initialData,
  });
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? "");
  const [imageError, setImageError] = useState("");
  const [customPosition, setCustomPosition] = useState(
    () => !!initialData?.imagePos && !POSITION_PRESETS.some((p) => p.value === initialData.imagePos)
  );
  const mutation = useAdminMutation(QUERY_KEYS.heroSlides, () => router.push("/admin/hero-slides"));

  function set(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isEdit && !imageUrl) { setImageError("Please upload a background image."); return; }
    setImageError("");
    mutation.mutate({
      url: isEdit ? `/api/admin/hero-slides/${id}` : "/api/admin/hero-slides",
      method: isEdit ? "PATCH" : "POST",
      body: { ...form, imageUrl },
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "720px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

        <p style={sectionHead}>Slide Content</p>
        <div><label style={labelStyle}>Eyebrow Text *</label><input value={form.eyebrow} onChange={set("eyebrow")} required placeholder="Executive Operating System Architect · Fractional COO · Coach" style={input} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div><label style={labelStyle}>Headline *</label><input value={form.line1} onChange={set("line1")} required placeholder="Clarity → Architecture" style={input} /></div>
          <div>
            <label style={labelStyle}>Highlighted Phrase *</label>
            <input value={form.line2} onChange={set("line2")} required placeholder="→ Momentum." style={input} />
          </div>
        </div>
        <p className="text-dim font-light" style={{ fontSize: "0.68rem", lineHeight: 1.6, marginTop: "-20px" }}>
          The Highlighted Phrase appears in gold, right after the Headline.
        </p>
        <div><label style={labelStyle}>Subtitle Paragraph *</label><textarea value={form.subtitle} onChange={set("subtitle")} required rows={4} placeholder="You're at the kind of inflection point…" style={{ ...input, resize: "vertical", lineHeight: 1.7 }} /></div>

        <p style={sectionHead}>Background Image</p>
        <ImageUpload value={imageUrl} onChange={setImageUrl} label={isEdit ? "Background Image (replace to change)" : "Background Image *"} />
        {imageError && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)", marginTop: "-12px" }}>{imageError}</p>}
        <div style={{ maxWidth: "260px" }}>
          <label style={labelStyle}>Image Focus Point</label>
          {customPosition ? (
            <input value={form.imagePos} onChange={set("imagePos")} placeholder="center top" style={input} />
          ) : (
            <select value={form.imagePos} onChange={set("imagePos")} style={input}>
              {POSITION_PRESETS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          )}
          <button
            type="button"
            onClick={() => setCustomPosition((v) => !v)}
            style={{ background: "none", border: "none", color: "var(--dim)", fontSize: "0.68rem", fontFamily: "var(--font-body)", padding: "8px 0 0", cursor: "pointer" }}
          >
            {customPosition ? "Use a preset instead" : "Advanced: enter a custom position"}
          </button>
        </div>

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

        {mutation.isError && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{mutation.error.message}</p>}
        <div style={{ display: "flex", gap: "16px" }}>
          <button type="submit" disabled={mutation.isPending} className="btn-solid" style={{ opacity: mutation.isPending ? 0.6 : 1, fontSize: "0.78rem", padding: "11px 28px" }}>{mutation.isPending ? "Saving…" : isEdit ? "Save Changes" : "Add Slide"}</button>
          <button type="button" onClick={() => router.push("/admin/hero-slides")} style={{ background: "none", border: "1px solid var(--surface-2)", color: "var(--muted)", padding: "11px 24px", fontFamily: "var(--font-body)", fontSize: "0.78rem", cursor: "pointer" }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
