import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";

export async function GET() {
  await connectDB();
  const items = await Product.find().sort({ order: 1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const p = await Product.create({
    title:       data.title,
    subtitle:    data.subtitle,
    type:        data.type,
    description: data.description,
    price:       data.price,
    priceNote:   data.priceNote,
    tag:         data.tag,
    selarUrl:    data.selarUrl || "",
    available:   data.available !== false,
    coverAccent: data.coverAccent,
    order:       data.order ? Number(data.order) : 99,
  });
  revalidatePath("/marketplace");
  return NextResponse.json(p.toJSON(), { status: 201 });
}
