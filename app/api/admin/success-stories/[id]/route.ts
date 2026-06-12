import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await req.json();
  const updated = await sanityClient.patch(id).set({
    code: data.code,
    title: data.title,
    sector: data.sector,
    client: data.client,
    result: data.result,
    story: data.story,
    order: data.order ? Number(data.order) : undefined,
  }).commit();
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await sanityClient.delete(id);
  return NextResponse.json({ deleted: true });
}
