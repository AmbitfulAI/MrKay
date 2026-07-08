import { connectDB } from "@/lib/db";
import { SiteConfig } from "@/lib/models/SiteConfig";
import type { SiteConfigShape } from "@/lib/site-config-defaults";

export type { SiteConfigShape };
export type SiteConfigData = Partial<SiteConfigShape>;

export async function getSiteConfig(): Promise<SiteConfigData | null> {
  await connectDB();
  const raw = await SiteConfig.findById("siteConfig").lean<SiteConfigData>().catch(() => null);
  if (!raw) return null;
  return {
    calendlyUrl:   raw.calendlyUrl,
    contactEmail:  raw.contactEmail,
    footerTagline: raw.footerTagline,
    footerBlurb:   raw.footerBlurb,
    linkedInUrl:   raw.linkedInUrl,
    instagramUrl:  raw.instagramUrl,
    statsBar: (raw.statsBar ?? []).map(({ line, descriptor }) => ({ line, descriptor })),
  };
}
