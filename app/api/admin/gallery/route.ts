import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";
import { galleryQuery } from "@/sanity/queries";

export async function GET() {
  const items = await sanityClient.fetch(galleryQuery);
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const doc = {
    _type: "galleryImage",
    title: data.title,
    caption: data.caption,
    category: data.category,
    image: data.assetId
      ? { _type: "image", asset: { _type: "reference", _ref: data.assetId }, alt: data.alt }
      : undefined,
    span: data.span || "normal",
    order: data.order ? Number(data.order) : undefined,
  };
  const created = await sanityClient.create(doc);
  return NextResponse.json(created, { status: 201 });
}
