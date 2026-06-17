import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await req.json();
  const patch: Record<string, unknown> = {
    eyebrow:          data.eyebrow,
    line1:            data.line1,
    line2:            data.line2,
    subtitle:         data.subtitle,
    imagePos:         data.imagePos || "center top",
    primaryLabel:     data.primaryLabel,
    primaryHref:      data.primaryHref || "",
    primaryCalendly:  data.primaryCalendly === "true",
    secondaryLabel:   data.secondaryLabel || "",
    secondaryHref:    data.secondaryHref || "",
    secondaryCalendly: data.secondaryCalendly === "true",
    order: data.order ? Number(data.order) : undefined,
  };
  if (data.assetId) {
    patch.image = { _type: "image", asset: { _type: "reference", _ref: data.assetId } };
  }
  const updated = await sanityClient.patch(id).set(patch).commit();
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await sanityClient.delete(id);
  return NextResponse.json({ deleted: true });
}
