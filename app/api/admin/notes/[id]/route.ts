import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/sanity/client';
import { generateUniqueSlug } from '@/lib/admin-utils';

function textToBlocks(text: string) {
  return text
    .split(/\n\n+/)
    .map((para) => para.trim())
    .filter(Boolean)
    .map((para) => ({
      _type: 'block',
      _key: crypto.randomUUID(),
      style: 'normal',
      markDefs: [],
      children: [
        { _type: 'span', _key: crypto.randomUUID(), text: para, marks: [] },
      ],
    }));
}

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const note = await sanityClient.getDocument(id);
  if (!note) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(note);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const data = await req.json();

  const slug = await generateUniqueSlug('note', data.title, id);

  const patch = sanityClient.patch(id).set({
    title: data.title,
    'slug.current': slug,
    category: data.category,
    date: data.date,
    excerpt: data.excerpt,
    body: textToBlocks(data.body ?? ''),
  });

  const updated = await patch.commit();
  return NextResponse.json(updated);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await sanityClient.delete(id);
  return NextResponse.json({ deleted: true });
}
