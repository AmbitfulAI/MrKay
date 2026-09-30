import { type NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Comment } from "@/lib/models/Comment";
import { Note } from "@/lib/models/Note";
import { sendCommentNotification } from "@/lib/mailer";

const MAX_URLS_ALLOWED = 2;

export async function GET(req: NextRequest) {
  const noteId = req.nextUrl.searchParams.get("noteId");
  if (!noteId) {
    return NextResponse.json({ error: "noteId is required." }, { status: 400 });
  }

  await connectDB();
  const comments = await Comment.find({ noteId })
    .sort({ createdAt: 1 })
    .lean()
    .catch(() => []);

  return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  // Honeypot: real visitors never fill this hidden field. Bots do.
  // Pretend success so bots don't learn they were caught.
  if (body?.website) {
    return NextResponse.json({ ok: true });
  }

  const { noteId, parentId, authorName, authorEmail, content } = body ?? {};

  if (!noteId || !authorName || !authorEmail || !content) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const urlCount = (String(content).match(/https?:\/\//g) ?? []).length;
  if (urlCount > MAX_URLS_ALLOWED) {
    return NextResponse.json({ error: "Comment rejected." }, { status: 400 });
  }

  await connectDB();

  const note = await Note.findById(noteId).select("title slug").lean<{ title: string; slug: string }>();
  if (!note) {
    return NextResponse.json({ error: "Note not found." }, { status: 404 });
  }

  // Cap nesting at one level: replying to a reply attaches to that reply's
  // own parent instead, so the thread never goes deeper than comment → reply.
  let resolvedParentId: string | null = null;
  if (parentId) {
    const parent = await Comment.findById(parentId).select("noteId parentId").lean<{ noteId: unknown; parentId: unknown }>();
    if (!parent || String(parent.noteId) !== String(noteId)) {
      return NextResponse.json({ error: "Invalid parent comment." }, { status: 400 });
    }
    resolvedParentId = parent.parentId ? String(parent.parentId) : String(parentId);
  }

  const comment = await Comment.create({
    noteId,
    parentId: resolvedParentId,
    authorName,
    authorEmail,
    content,
  });

  await sendCommentNotification({
    noteTitle: note.title,
    noteSlug: note.slug,
    authorName,
    authorEmail,
    content,
    isReply: !!resolvedParentId,
  });

  return NextResponse.json(comment.toJSON(), { status: 201 });
}
