import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { GalleryImage } from "@/lib/models/GalleryImage";

export async function PATCH(req: NextRequest) {
  await connectDB();
  const { items } = await req.json();
  await Promise.all(
    (items as { id: string; order: number }[]).map((i) =>
      GalleryImage.findByIdAndUpdate(i.id, { $set: { order: i.order } })
    )
  );
  revalidatePath("/visual-diary");
  return NextResponse.json({ ok: true });
}
