import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file)
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
  const token = process.env.SANITY_API_TOKEN;

  const bytes = await file.arrayBuffer();

  const res = await fetch(
    `https://${projectId}.api.sanity.io/v1/assets/images/${dataset}?filename=${encodeURIComponent(file.name)}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': file.type || 'image/jpeg',
      },
      body: bytes,
    },
  );

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json({ assetId: data.document._id });
}
