import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Comment } from "@/lib/models/Comment";
import "@/lib/models/Note";

interface LeanComment {
  _id: unknown;
  noteId: { _id: unknown; title: string; slug: string } | null;
  parentId: unknown;
  authorName: string;
  authorEmail: string;
  content: string;
  likes: number;
  createdAt: Date;
}

export async function GET() {
  await connectDB();

  const comments = await Comment.find()
    .sort({ createdAt: -1 })
    .populate<{ noteId: { _id: unknown; title: string; slug: string } | null }>("noteId", "title slug")
    .lean<LeanComment[]>()
    .catch(() => []);

  return NextResponse.json(
    comments.map((c) => ({
      _id: String(c._id),
      note: c.noteId ? { title: c.noteId.title, slug: c.noteId.slug } : null,
      parentId: c.parentId ? String(c.parentId) : null,
      authorName: c.authorName,
      authorEmail: c.authorEmail,
      content: c.content,
      likes: c.likes,
      createdAt: c.createdAt,
    })),
  );
}
