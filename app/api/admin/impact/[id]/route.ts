import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { ImpactOrg } from "@/lib/models/ImpactOrg";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  const data = await req.json();
  const update: Record<string, unknown> = {
    name:        data.name,
    category:    data.category,
    role:        data.role,
    since:       data.since,
    description: data.description,
    url:         data.url || "",
    active:      data.active !== false,
    alt:         data.alt ?? "",
    order:       data.order ? Number(data.order) : 99,
  };
  if (data.imageUrl) update.imageUrl = data.imageUrl;
  const org = await ImpactOrg.findByIdAndUpdate(id, update, { new: true });
  if (!org) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/impact");
  return NextResponse.json(org.toJSON());
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  await ImpactOrg.findByIdAndDelete(id);
  revalidatePath("/impact");
  return NextResponse.json({ deleted: true });
}
