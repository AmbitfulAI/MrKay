import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";
import { siteConfigQuery } from "@/sanity/queries";

export async function GET() {
  const config = await sanityClient.fetch(siteConfigQuery);
  return NextResponse.json(config ?? {});
}

export async function PATCH(req: NextRequest) {
  const data = await req.json();
  const statsBar = Array.isArray(data.statsBar)
    ? data.statsBar.map((s: { line: string; descriptor: string }, i: number) => ({
        _key: `stat-${i + 1}`,
        line: s.line,
        descriptor: s.descriptor,
      }))
    : undefined;

  const updated = await sanityClient.createOrReplace({
    _id:   "siteConfig",
    _type: "siteConfig",
    calendlyUrl:   data.calendlyUrl,
    contactEmail:  data.contactEmail,
    footerTagline: data.footerTagline,
    footerBlurb:   data.footerBlurb,
    linkedInUrl:   data.linkedInUrl,
    instagramUrl:  data.instagramUrl,
    ...(statsBar ? { statsBar } : {}),
  });
  return NextResponse.json(updated);
}
