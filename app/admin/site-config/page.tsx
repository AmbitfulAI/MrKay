import { connectDB } from "@/lib/db";
import { SiteConfig } from "@/lib/models/SiteConfig";
import { SiteConfigForm } from "./SiteConfigForm";
import { SITE_CONFIG_DEFAULTS, type SiteConfigShape } from "@/lib/site-config-defaults";

export const revalidate = 0;

export default async function AdminSiteConfig() {
  await connectDB();
  const raw = await SiteConfig.findById("siteConfig").lean<SiteConfigShape>().catch(() => null);
  const config: SiteConfigShape = {
    ...SITE_CONFIG_DEFAULTS,
    ...raw,
    statsBar: raw?.statsBar?.length ? raw.statsBar : SITE_CONFIG_DEFAULTS.statsBar,
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
