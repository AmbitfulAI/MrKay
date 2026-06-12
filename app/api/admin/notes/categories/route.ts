import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/sanity/client';
import { generateUniqueSlug } from '@/lib/admin-utils';

interface SanityCategory {
  _id: string;
  title: string;
  order?: number;
}

const FALLBACK = [
  'Leadership',
  'Board Work',
  'Strategy',
  'Media & Speaking',
  'Faith & Life',
  'Creative',
];

export async function GET() {
  try {
    const cats = await sanityClient.fetch<SanityCategory[]>(
      `*[_type == "noteCategory"] | order(order asc) { _id, title, order }`,
    );
    if (cats.length > 0) return NextResponse.json(cats);
    return NextResponse.json(
      FALLBACK.map((title, i) => ({ _id: '', title, order: i + 1 })),
    );
  } catch {
    return NextResponse.json(
      FALLBACK.map((title, i) => ({ _id: '', title, order: i + 1 })),
    );
  }
}

export async function POST(req: NextRequest) {
  const { title, order } = await req.json();
  if (!title?.trim())
    return NextResponse.json({ error: 'Title required' }, { status: 400 });

  const slug = await generateUniqueSlug('noteCategory', title);
  const doc = await sanityClient.create({
    _type: 'noteCategory',
    title: title.trim(),
    slug: { _type: 'slug', current: slug },
    order: order ?? 99,
  });

  return NextResponse.json(doc, { status: 201 });
}
