import { connectDB } from "@/lib/db";
import { SiteConfig } from "@/lib/models/SiteConfig";
import type { SiteConfigShape } from "@/lib/site-config-defaults";

export type { SiteConfigShape };
export type SiteConfigData = Partial<SiteConfigShape>;

export async function getSiteConfig(): Promise<SiteConfigData | null> {
  await connectDB();
  return SiteConfig.findById("siteConfig").lean<SiteConfigData>().catch(() => null);
}
