import { connectDB } from "@/lib/db";
import { SiteConfig } from "@/lib/models/SiteConfig";
import { SiteConfigForm } from "./SiteConfigForm";

export const revalidate = 0;

const DEFAULTS = {
  calendlyUrl:   "https://calendly.com/thekayodekolade",
  contactEmail:  "hello@thekayodekolade.com",
  footerTagline: "Executive Operating System Architect · Fractional COO · Coach",
  footerBlurb:   "Helping professionals, founders, and organisations turn clarity into operating architecture and execution momentum.",
  linkedInUrl:   "https://linkedin.com",
  instagramUrl:  "https://instagram.com",
  statsBar: [
    { line: "15+ Years",        descriptor: "Leadership, Transformation & Systems Building" },
    { line: "Multi-Country",    descriptor: "Executive Leadership Across Africa" },
    { line: "Operating Models", descriptor: "Governance & Organisational Effectiveness" },
    { line: "ICF Member",       descriptor: "Brain-Based Coach · Organisational Development Practitioner" },
  ],
};

export default async function AdminSiteConfig() {
  await connectDB();
  const raw = await SiteConfig.findById("siteConfig").lean<typeof DEFAULTS & { statsBar: { line: string; descriptor: string }[] }>().catch(() => null);
  const config = {
    ...DEFAULTS,
    ...raw,
    statsBar: raw?.statsBar?.length ? raw.statsBar : DEFAULTS.statsBar,
  };

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: "40px" }}>
        <h1 className="display text-text" style={{ fontSize: "1.8rem" }}>Site Configuration</h1>
        <p className="text-dim font-light" style={{ fontSize: "0.78rem", marginTop: "4px" }}>
          Global settings — Calendly URL, contact email, social links, footer copy, and homepage stats.
        </p>
      </div>
      <SiteConfigForm initial={config} />
    </div>
  );
}
