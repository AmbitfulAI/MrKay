import { NextRequest, NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";
import { faqsQuery } from "@/sanity/queries";

export async function GET() {
  const items = await sanityClient.fetch(faqsQuery);
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const doc = {
    _type: "faq",
    question: data.question,
    answer: data.answer,
    order: data.order ? Number(data.order) : undefined,
  };
  const created = await sanityClient.create(doc);
  return NextResponse.json(created, { status: 201 });
}
