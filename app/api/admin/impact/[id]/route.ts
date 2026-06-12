import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await req.json();

  const patch = sanityClient.patch(id).set({
    name: data.name,
    category: data.category,
    role: data.role,
    since: data.since,
    description: data.description,
    url: data.url || undefined,
    active: data.active !== false,
    order: data.order ? Number(data.order) : undefined,
    "image.alt": data.alt,
  });

  if (data.assetId) {
    patch.set({ "image.asset": { _type: "reference", _ref: data.assetId } });
  }

  const updated = await patch.commit();
  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await sanityClient.delete(id);
  return NextResponse.json({ deleted: true });
}
