import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Testimonial } from "@/lib/models/Testimonial";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  const data = await req.json();
  const t = await Testimonial.findByIdAndUpdate(
    id,
    { quote: data.quote, clientName: data.clientName, clientContext: data.clientContext, order: data.order ? Number(data.order) : 99, pages: Array.isArray(data.pages) ? data.pages : [] },
    { new: true },
  );
  if (!t) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/testimonials");
  return NextResponse.json(t.toJSON());
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  await Testimonial.findByIdAndDelete(id);
  revalidatePath("/testimonials");
  return NextResponse.json({ deleted: true });
}
