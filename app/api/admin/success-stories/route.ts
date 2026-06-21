import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { SuccessStory } from "@/lib/models/SuccessStory";

export async function GET() {
  await connectDB();
  const items = await SuccessStory.find().sort({ order: 1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const s = await SuccessStory.create({
    code:   data.code,
    title:  data.title,
    sector: data.sector,
    client: data.client,
    result: data.result,
    story:  data.story,
    order:  data.order ? Number(data.order) : 99,
  });
  revalidatePath("/testimonials");
  return NextResponse.json(s.toJSON(), { status: 201 });
}
