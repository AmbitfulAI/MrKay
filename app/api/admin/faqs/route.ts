import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Faq } from "@/lib/models/Faq";

export async function GET() {
  await connectDB();
  const items = await Faq.find().sort({ order: 1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const last = await Faq.findOne().sort({ order: -1 }).select("order").lean<{ order?: number }>();
  const faq = await Faq.create({
    question: data.question,
    answer:   data.answer,
    order:    data.order ? Number(data.order) : (last?.order ?? 0) + 1,
  });
  revalidatePath("/contact");
  return NextResponse.json(faq.toJSON(), { status: 201 });
}
