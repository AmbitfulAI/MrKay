import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";
import { heroSlidesQuery } from "@/sanity/queries";

export async function GET() {
  const items = await sanityClient.fetch(heroSlidesQuery);
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const doc = {
    _type: "heroSlide",
    eyebrow:  data.eyebrow,
    line1:    data.line1,
    line2:    data.line2,
    subtitle: data.subtitle,
    image: data.assetId
      ? { _type: "image", asset: { _type: "reference", _ref: data.assetId } }
      : undefined,
    imagePos:         data.imagePos || "center top",
    primaryLabel:     data.primaryLabel,
    primaryHref:      data.primaryHref || "",
    primaryCalendly:  data.primaryCalendly === "true",
    secondaryLabel:   data.secondaryLabel || "",
    secondaryHref:    data.secondaryHref || "",
    secondaryCalendly: data.secondaryCalendly === "true",
    order: data.order ? Number(data.order) : undefined,
  };
  const created = await sanityClient.create(doc);
  return NextResponse.json(created, { status: 201 });
}
