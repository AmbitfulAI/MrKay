import { connectDB } from "@/lib/db";
import { SiteConfig } from "@/lib/models/SiteConfig";

export interface SiteConfigData {
  calendlyUrl?: string;
  contactEmail?: string;
  footerTagline?: string;
  footerBlurb?: string;
  linkedInUrl?: string;
  instagramUrl?: string;
  statsBar?: { line: string; descriptor: string }[];
}

export async function getSiteConfig(): Promise<SiteConfigData | null> {
  await connectDB();
  return SiteConfig.findById("siteConfig").lean<SiteConfigData>().catch(() => null);
}
