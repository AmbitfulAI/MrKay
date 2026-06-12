import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";
import { impactOrgsQuery } from "@/sanity/queries";

export async function GET() {
  const items = await sanityClient.fetch(impactOrgsQuery);
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const doc = {
    _type: "impactOrg",
    name: data.name,
    category: data.category,
    role: data.role,
    since: data.since,
    description: data.description,
    url: data.url || undefined,
    active: data.active !== false,
    image: data.assetId
      ? { _type: "image", asset: { _type: "reference", _ref: data.assetId }, alt: data.alt }
      : undefined,
    order: data.order ? Number(data.order) : undefined,
  };
  const created = await sanityClient.create(doc);
  return NextResponse.json(created, { status: 201 });
}
