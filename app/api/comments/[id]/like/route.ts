import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Comment } from "@/lib/models/Comment";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;

  const comment = await Comment.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { returnDocument: "after" },
  ).select("likes");

  if (!comment) {
    return NextResponse.json({ error: "Comment not found." }, { status: 404 });
  }

  return NextResponse.json({ likes: comment.likes });
}
