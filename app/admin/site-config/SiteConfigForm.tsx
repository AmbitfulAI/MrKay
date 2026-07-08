"use client";

import { useState } from "react";
import { useAdminMutation } from "@/lib/queries/useAdminMutation";
import { QUERY_KEYS } from "@/lib/queries/keys";

interface StatRow { line: string; descriptor: string; }
interface Config {
  calendlyUrl:   string;
  contactEmail:  string;
  footerTagline: string;
  footerBlurb:   string;
  linkedInUrl:   string;
  instagramUrl:  string;
  statsBar:      StatRow[];
}

const input: React.CSSProperties = { width: "100%", background: "var(--surface)", border: "1px solid var(--surface-2)", color: "var(--text)", padding: "10px 14px", fontFamily: "var(--font-body)", fontSize: "0.88rem", outline: "none", boxSizing: "border-box" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--dim)", fontFamily: "var(--font-body)", marginBottom: "8px" };
const sectionHead: React.CSSProperties = { fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-body)", paddingBottom: "12px", borderBottom: "1px solid var(--surface-2)", marginBottom: "4px" };

export function SiteConfigForm({ initial }: { initial: Config }) {
  const [form, setForm] = useState<Config>(initial);
  const [saved, setSaved] = useState(false);
  const mutation = useAdminMutation(QUERY_KEYS.siteConfig, () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  });

  function setField(field: keyof Config) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function setStat(i: number, key: keyof StatRow) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => {
        const stats = [...f.statsBar];
        stats[i] = { ...stats[i], [key]: e.target.value };
        return { ...f, statsBar: stats };
      });
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate({ url: "/api/admin/site-config", method: "PATCH", body: form });
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "720px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>

        <p style={sectionHead}>Booking & Contact</p>
        <div><label style={labelStyle}>Calendly URL *</label><input value={form.calendlyUrl} onChange={setField("calendlyUrl")} required placeholder="https://calendly.com/thekayodekolade" style={input} /></div>
        <div><label style={labelStyle}>Contact Email *</label><input type="email" value={form.contactEmail} onChange={setField("contactEmail")} required placeholder="hello@thekayodekolade.com" style={input} /></div>

        <p style={sectionHead}>Footer</p>
        <div><label style={labelStyle}>Footer Tagline</label><input value={form.footerTagline} onChange={setField("footerTagline")} placeholder="Executive Operating System Architect · Fractional COO · Coach" style={input} /></div>
        <div><label style={labelStyle}>Footer Brand Blurb</label><textarea value={form.footerBlurb} onChange={setField("footerBlurb")} rows={2} style={{ ...input, resize: "vertical", lineHeight: 1.7 }} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div><label style={labelStyle}>LinkedIn URL</label><input value={form.linkedInUrl} onChange={setField("linkedInUrl")} placeholder="https://linkedin.com/in/..." style={input} /></div>
          <div><label style={labelStyle}>Instagram URL</label><input value={form.instagramUrl} onChange={setField("instagramUrl")} placeholder="https://instagram.com/..." style={input} /></div>
        </div>

        <p style={sectionHead}>Homepage Stats Bar</p>
        <p className="text-dim font-light" style={{ fontSize: "0.72rem", lineHeight: 1.7, marginTop: "-12px" }}>Four stat blocks shown below the hero on the homepage.</p>
        {form.statsBar.map((stat, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px", padding: "16px 20px", background: "var(--surface)", border: "1px solid var(--surface-2)" }}>
            <div><label style={labelStyle}>Stat Value</label><input value={stat.line} onChange={setStat(i, "line")} placeholder="15+ Years" style={input} /></div>
            <div><label style={labelStyle}>Description</label><input value={stat.descriptor} onChange={setStat(i, "descriptor")} placeholder="Leadership, Transformation & Systems Building" style={input} /></div>
          </div>
        ))}

        {mutation.isError && <p style={{ fontSize: "0.8rem", color: "#e05555", fontFamily: "var(--font-body)" }}>{mutation.error.message}</p>}
        {saved && <p style={{ fontSize: "0.8rem", color: "var(--gold)", fontFamily: "var(--font-body)" }}>✓ Saved successfully</p>}
        <div>
          <button type="submit" disabled={mutation.isPending} className="btn-solid" style={{ opacity: mutation.isPending ? 0.6 : 1, fontSize: "0.78rem", padding: "11px 28px" }}>{mutation.isPending ? "Saving…" : "Save Configuration"}</button>
        </div>
      </div>
    </form>
  );
}
