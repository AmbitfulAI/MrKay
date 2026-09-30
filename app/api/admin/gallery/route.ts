import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { GalleryImage } from "@/lib/models/GalleryImage";

export async function GET() {
  await connectDB();
  const items = await GalleryImage.find().sort({ order: 1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const last = await GalleryImage.findOne().sort({ order: -1 }).select("order").lean<{ order?: number }>();
  const img = await GalleryImage.create({
    title:    data.title,
    caption:  data.caption,
    category: data.category,
    imageUrl: data.imageUrl ?? "",
    alt:      data.alt ?? "",
    order:    data.order ? Number(data.order) : (last?.order ?? 0) + 1,
  });
  revalidatePath("/visual-diary");
  return NextResponse.json(img.toJSON(), { status: 201 });
}
