import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Comment } from "@/lib/models/Comment";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;

  await Comment.deleteMany({ $or: [{ _id: id }, { parentId: id }] });

  return NextResponse.json({ deleted: true });
}
