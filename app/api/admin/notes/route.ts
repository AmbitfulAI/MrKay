import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Note } from "@/lib/models/Note";
import { Category } from "@/lib/models/Category";
import { generateUniqueSlug, bodyToArray } from "@/lib/admin-utils";
import { sendNoteNotification } from "@/lib/mailer";
import { NoteBodySchema } from "@/lib/schemas/note";

export async function GET() {
  await connectDB();
  const notes = await Note.find().populate("category", "title").sort({ createdAt: -1 }).lean();
  return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const raw = await req.json();
  const parsed = NoteBodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const data = parsed.data;
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
  const cat = await Category.findById(data.category).lean<{ title: string; slug: string }>().catch(() => null);
  if (cat) revalidatePath(`/writing/${cat.slug}`);
  const saved = note.toJSON();
  sendNoteNotification({
    title:    saved.title,
    slug:     saved.slug,
    category: cat?.title ?? "",
    date:     saved.date,
    excerpt:  saved.excerpt,
  }).catch(console.error);
  return NextResponse.json(saved, { status: 201 });
}
