import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/sanity/client';
import { generateUniqueSlug } from '@/lib/admin-utils';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { title, order } = await req.json();

  const fields: Record<string, unknown> = {};
  if (title?.trim()) {
    fields.title = title.trim();
    const slug = await generateUniqueSlug('noteCategory', title, id);
    fields['slug.current'] = slug;
  }
  if (order !== undefined) fields.order = order;

  const updated = await sanityClient.patch(id).set(fields).commit();
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
