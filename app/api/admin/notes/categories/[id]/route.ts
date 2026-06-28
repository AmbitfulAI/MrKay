import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Category } from "@/lib/models/Category";
import { generateUniqueSlug } from "@/lib/admin-utils";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  const { title, order, type, tagline, description, themes } = await req.json();
  const update: Record<string, unknown> = {};
  if (title?.trim()) {
    update.title = title.trim();
    update.slug  = await generateUniqueSlug("Category", title, id);
  }
  if (order !== undefined) update.order = order;
  if (type !== undefined) update.type = type;
  if (tagline !== undefined) update.tagline = tagline;
  if (description !== undefined) update.description = description;
  if (Array.isArray(themes)) update.themes = themes;
  const cat = await Category.findByIdAndUpdate(id, update, { new: true });
  if (!cat) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(cat.toJSON());
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  await Category.findByIdAndDelete(id);
  return NextResponse.json({ deleted: true });
}
