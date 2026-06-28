import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Note } from "@/lib/models/Note";
import { Category } from "@/lib/models/Category";
import { generateUniqueSlug, bodyToArray } from "@/lib/admin-utils";

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
  const data = await req.json();
  const slug = await generateUniqueSlug("Note", data.title, id);
  const note = await Note.findByIdAndUpdate(
    id,
    {
      title:    data.title,
      slug,
      category: data.category,
      date:     data.date,
      excerpt:  data.excerpt,
      body:     bodyToArray(data.body ?? ""),
      ...(data.featuredImage !== undefined && { featuredImage: data.featuredImage }),
    },
    { new: true },
  );
  if (!note) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/my-notes");
  revalidatePath(`/my-notes/${slug}`);
  const cat = await Category.findOne({ title: data.category, type: "writing" })
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
  const deleted = await Note.findByIdAndDelete(id).lean<{ category: string }>();
  revalidatePath("/my-notes");
  if (deleted?.category) {
    const cat = await Category.findOne({ title: deleted.category, type: "writing" })
      .lean<{ slug: string }>()
      .catch(() => null);
    if (cat) revalidatePath(`/writing/${cat.slug}`);
  }
  return NextResponse.json({ deleted: true });
}
