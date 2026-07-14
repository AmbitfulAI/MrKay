import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Note } from "@/lib/models/Note";
import { Category } from "@/lib/models/Category";
import { generateUniqueSlug, bodyToArray } from "@/lib/admin-utils";
import { NoteBodySchema, formatZodError } from "@/lib/schemas/note";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  const note = await Note.findById(id).lean();
  if (!note) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(note);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  const raw = await req.json();
  const parsed = NoteBodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: formatZodError(parsed.error) }, { status: 400 });
  }
  const data = parsed.data;
  const slug = await generateUniqueSlug("Note", data.title, id);
  const bodyText = (data.contentBlocks ?? [])
    .filter((b) => b.type === "text")
    .map((b) => b.content)
    .join("\n\n");
  const note = await Note.findByIdAndUpdate(
    id,
    {
      title:    data.title,
      slug,
      category: data.category,
      date:     new Date(data.date),
      excerpt:  data.excerpt,
      body:     bodyToArray(bodyText || data.body || ""),
      ...(data.featuredImages !== undefined && { featuredImages: data.featuredImages }),
      ...(data.contentBlocks !== undefined && { contentBlocks: data.contentBlocks }),
    },
    { new: true },
  );
  if (!note) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/writing");
  revalidatePath(`/writing/note/${slug}`);
  const cat = await Category.findById(data.category)
    .lean<{ slug: string }>()
    .catch(() => null);
  if (cat) revalidatePath(`/writing/${cat.slug}`);
  return NextResponse.json(note.toJSON());
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  const deleted = await Note.findByIdAndDelete(id).lean<{ category: unknown }>();
  revalidatePath("/writing");
  if (deleted?.category) {
    const cat = await Category.findById(deleted.category)
      .lean<{ slug: string }>()
      .catch(() => null);
    if (cat) revalidatePath(`/writing/${cat.slug}`);
  }
  return NextResponse.json({ deleted: true });
}
