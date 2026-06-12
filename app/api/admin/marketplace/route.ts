import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";
import { productsQuery } from "@/sanity/queries";

export async function GET() {
  const items = await sanityClient.fetch(productsQuery);
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const doc = {
    _type: "product",
    title: data.title,
    subtitle: data.subtitle,
    type: data.type,
    description: data.description,
    price: data.price,
    priceNote: data.priceNote,
    tag: data.tag,
    selarUrl: data.selarUrl || undefined,
    available: data.available !== false,
    coverAccent: data.coverAccent,
    order: data.order ? Number(data.order) : undefined,
  };
  const created = await sanityClient.create(doc);
  return NextResponse.json(created, { status: 201 });
}
