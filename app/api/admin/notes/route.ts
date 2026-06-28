import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Note } from "@/lib/models/Note";
import { generateUniqueSlug, bodyToArray } from "@/lib/admin-utils";
import { sendNoteNotification } from "@/lib/mailer";

export async function GET() {
  await connectDB();
  const notes = await Note.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const slug = await generateUniqueSlug("Note", data.title);
  const note = await Note.create({
    title:    data.title,
    slug,
    category: data.category,
    date:     data.date,
    excerpt:  data.excerpt,
    body:     bodyToArray(data.body ?? ""),
    featuredImage: data.featuredImage ?? "",
  });
  revalidatePath("/writing");
  const saved = note.toJSON();
  sendNoteNotification({
    title:    saved.title,
    slug:     saved.slug,
    category: saved.category,
    date:     saved.date,
    excerpt:  saved.excerpt,
  }).catch(console.error);
  return NextResponse.json(saved, { status: 201 });
}
