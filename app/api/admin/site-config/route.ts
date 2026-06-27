import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { SiteConfig } from "@/lib/models/SiteConfig";

export async function GET() {
  await connectDB();
  const config = await SiteConfig.findById("siteConfig").lean();
  return NextResponse.json(config ?? {});
}

export async function PATCH(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const config = await SiteConfig.findByIdAndUpdate(
    "siteConfig",
    {
      _id:           "siteConfig",
      calendlyUrl:   data.calendlyUrl,
      contactEmail:  data.contactEmail,
      footerTagline: data.footerTagline,
      footerBlurb:   data.footerBlurb,
      linkedInUrl:   data.linkedInUrl,
      instagramUrl:  data.instagramUrl,
      statsBar:      Array.isArray(data.statsBar) ? data.statsBar : [],
    },
    { new: true, upsert: true },
  );
  revalidatePath("/");
  return NextResponse.json(config?.toJSON() ?? {});
}
