import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Testimonial } from "@/lib/models/Testimonial";

export async function GET() {
  await connectDB();
  const items = await Testimonial.find().sort({ order: 1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const t = await Testimonial.create({
    quote:         data.quote,
    clientName:    data.clientName,
    clientContext: data.clientContext,
    order:         data.order ? Number(data.order) : 99,
    pages:         Array.isArray(data.pages) ? data.pages : [],
  });
  revalidatePath("/testimonials");
  return NextResponse.json(t.toJSON(), { status: 201 });
}
