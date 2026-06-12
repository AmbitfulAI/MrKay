import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";
import { successStoriesQuery } from "@/sanity/queries";

export async function GET() {
  const items = await sanityClient.fetch(successStoriesQuery);
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const doc = {
    _type: "successStory",
    code: data.code,
    title: data.title,
    sector: data.sector,
    client: data.client,
    result: data.result,
    story: data.story,
    order: data.order ? Number(data.order) : undefined,
  };
  const created = await sanityClient.create(doc);
  return NextResponse.json(created, { status: 201 });
}
