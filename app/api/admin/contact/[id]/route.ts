import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ContactSubmission } from "@/lib/models/ContactSubmission";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  const data = await req.json();
  const item = await ContactSubmission.findByIdAndUpdate(id, { read: data.read }, { new: true });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item.toJSON());
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  await ContactSubmission.findByIdAndDelete(id);
  return NextResponse.json({ deleted: true });
}
