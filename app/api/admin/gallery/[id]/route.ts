import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { GalleryImage } from "@/lib/models/GalleryImage";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  const data = await req.json();
  const update: Record<string, unknown> = {
    title:    data.title,
    caption:  data.caption,
    category: data.category,
    alt:      data.alt ?? "",
    span:     data.span || "normal",
    order:    data.order ? Number(data.order) : 99,
  };
  if (data.imageUrl) update.imageUrl = data.imageUrl;
  const img = await GalleryImage.findByIdAndUpdate(id, update, { new: true });
  if (!img) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/gallery");
  return NextResponse.json(img.toJSON());
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  await GalleryImage.findByIdAndDelete(id);
  revalidatePath("/gallery");
  return NextResponse.json({ deleted: true });
}
