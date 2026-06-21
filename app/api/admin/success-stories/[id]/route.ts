import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { SuccessStory } from "@/lib/models/SuccessStory";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  const data = await req.json();
  const s = await SuccessStory.findByIdAndUpdate(
    id,
    { code: data.code, title: data.title, sector: data.sector, client: data.client, result: data.result, story: data.story, order: data.order ? Number(data.order) : 99 },
    { new: true },
  );
  if (!s) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/testimonials");
  return NextResponse.json(s.toJSON());
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  await SuccessStory.findByIdAndDelete(id);
  revalidatePath("/testimonials");
  return NextResponse.json({ deleted: true });
}
