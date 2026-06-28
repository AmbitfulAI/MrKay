import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Subscriber } from "@/lib/models/Subscriber";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  const { active } = await req.json();
  const sub = await Subscriber.findByIdAndUpdate(id, { active }, { new: true });
  if (!sub) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(sub.toJSON());
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  await Subscriber.findByIdAndDelete(id);
  return NextResponse.json({ deleted: true });
}
