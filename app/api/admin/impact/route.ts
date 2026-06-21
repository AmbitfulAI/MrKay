import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { ImpactOrg } from "@/lib/models/ImpactOrg";

export async function GET() {
  await connectDB();
  const items = await ImpactOrg.find().sort({ order: 1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const org = await ImpactOrg.create({
    name:        data.name,
    category:    data.category,
    role:        data.role,
    since:       data.since,
    description: data.description,
    url:         data.url || "",
    active:      data.active !== false,
    imageUrl:    data.imageUrl ?? "",
    alt:         data.alt ?? "",
    order:       data.order ? Number(data.order) : 99,
  });
  revalidatePath("/impact");
  return NextResponse.json(org.toJSON(), { status: 201 });
}
