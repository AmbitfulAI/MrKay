import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Faq } from "@/lib/models/Faq";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  const data = await req.json();
  const faq = await Faq.findByIdAndUpdate(
    id,
    { question: data.question, answer: data.answer, order: data.order ? Number(data.order) : 99 },
    { new: true },
  );
  if (!faq) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/contact");
  return NextResponse.json(faq.toJSON());
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  await Faq.findByIdAndDelete(id);
  revalidatePath("/contact");
  return NextResponse.json({ deleted: true });
}
