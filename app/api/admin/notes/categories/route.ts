import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Category } from "@/lib/models/Category";
import { generateUniqueSlug } from "@/lib/admin-utils";

export async function GET() {
  await connectDB();
  const cats = await Category.find().sort({ order: 1 }).lean();
  return NextResponse.json(cats);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const { title, order, type, tagline, description, themes } = await req.json();
  if (!title?.trim()) return NextResponse.json({ error: "Title required" }, { status: 400 });
  const slug = await generateUniqueSlug("Category", title);
  const cat = await Category.create({
    title: title.trim(),
    slug,
    type: type ?? "writing",
    order: order ?? 99,
    tagline: tagline ?? "",
    description: description ?? "",
    themes: Array.isArray(themes) ? themes : [],
  });
  return NextResponse.json(cat.toJSON(), { status: 201 });
}
