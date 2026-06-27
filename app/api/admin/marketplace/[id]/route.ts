import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/Product";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  const data = await req.json();
  const p = await Product.findByIdAndUpdate(
    id,
    { title: data.title, subtitle: data.subtitle, type: data.type, description: data.description, price: data.price, priceNote: data.priceNote, tag: data.tag, selarUrl: data.selarUrl || "", available: data.available !== false, coverAccent: data.coverAccent, order: data.order ? Number(data.order) : 99 },
    { new: true },
  );
  if (!p) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/marketplace");
  return NextResponse.json(p.toJSON());
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  await Product.findByIdAndDelete(id);
  revalidatePath("/marketplace");
  return NextResponse.json({ deleted: true });
}
