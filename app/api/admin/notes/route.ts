import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";
import { notesQuery } from "@/sanity/queries";
import { generateUniqueSlug } from "@/lib/admin-utils";

function textToBlocks(text: string) {
  return text
    .split(/\n\n+/)
    .map((para) => para.trim())
    .filter(Boolean)
    .map((para) => ({
      _type: "block",
      _key: crypto.randomUUID(),
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: crypto.randomUUID(), text: para, marks: [] }],
    }));
}

export async function GET() {
  const notes = await sanityClient.fetch(notesQuery);
  return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const slug = await generateUniqueSlug("note", data.title);

  const doc = {
    _type: "note",
    title: data.title,
    slug: { _type: "slug", current: slug },
    category: data.category,
    date: data.date,
    excerpt: data.excerpt,
    body: textToBlocks(data.body ?? ""),
  };

  const created = await sanityClient.create(doc);
  return NextResponse.json(created, { status: 201 });
}
